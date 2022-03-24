import PhoneNumber from "awesome-phonenumber";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import { Model, QueryOptions, Schema, SchemaDefinitionProperty, SchemaTypeOptions } from "mongoose";

import { ModelNames } from "db";
import { generateSchoolMail } from "utils/user";
import { getImage, uploadImage } from "utils/file";

import type {
  UserBase,
  UserName as Name,
  UserImage as Image,
  UserContact as Contact,
  UserSubContact as SubContact,
} from "types/schema/User";

const emailValidator = (v?: string) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v ?? "");
};

export const createUserSchema = <D extends UserBase, M extends Model<D>>(obj: Def<D>) => {
  const schema = new Schema<UserBase, M>({
    ...obj,
    name: {
      type: UserName,
      required: [true, "Name required"],
    },
    contact: {
      type: UserContact,
      required: [true, "Contact required"],
    },
    gender: {
      type: String,
      required: [true, "Gender required"],
    },
    schoolMail: {
      trim: true,
      type: String,
      unique: true,
      lowercase: true,
      immutable: true,
      required: [true, "School mail required"],
      validate: {
        validator: emailValidator,
        msg: "Invalid email address",
      },
    },
    dob: {
      type: Date,
      default: undefined,
    },
    image: {
      type: UserImage,
      default: undefined,
    },
  });

  schema.plugin(mongooseLeanVirtuals);

  schema.pre("save", function (next) {
    this.set("schoolMail", generateSchoolMail(this.name.username));
    next();
  });

  schema.virtual("password", {
    justOne: true,
    localField: "_id",
    ref: ModelNames.AUTH,
    foreignField: "userId",
  });

  schema.static("findByUsername", function (username: string | string[], ...args: [any?, QueryOptions?]) {
    if (Array.isArray(username)) return this.find({ username }, ...args);
    return this.findOne({ username }, ...args);
  });

  schema.static("findBySchoolMail", function (schoolMail: string | string[], ...args: [any?, QueryOptions?]) {
    if (Array.isArray(schoolMail)) return this.find({ schoolMail }, ...args);
    return this.findOne({ schoolMail }, ...args);
  });

  return schema as unknown as Schema<D, M>;
};

const UserName = new Schema<Name>(
  {
    other: userSubName(),
    title: userSubName("Title required"),
    last: userSubName("Last name required"),
    full: userSubName("Full name required"),
    first: userSubName("First name required"),
    initials: userSubName("Initials required"),
    username: {
      unique: true,
      immutable: true,
      ...userSubName("User name required"),
    },
  },
  { _id: false }
);

const UserContact = new Schema<Contact>(
  {
    email: {
      required: [true, "Email required"],
      type: userSubContact("Email required", {
        lowercase: true,
        validate: [emailValidator, "Invalid email address"],
      }),
    },
    phone: {
      required: [true, "Phone required"],
      type: userSubContact("Phone required", {
        validate: [(v?: string) => PhoneNumber(v ?? "").isValid(), "Invalid phone number"],
      }),
    },
    address: {
      required: [true, "Address required"],
      type: userSubContact("Address required"),
    },
  },
  { _id: false }
);

const UserImage = new Schema<Image>(
  {
    cover: {
      type: String,
      get: getImage,
      default: undefined,
    },
    portrait: {
      type: String,
      get: getImage,
      default: undefined,
    },
  },
  { _id: false }
);

UserImage.pre("save", async function () {
  const [cover, portrait] = await Promise.all(
    [this.cover, this.portrait].map((url) => (url ? uploadImage(url) : undefined))
  );

  this.cover = cover;
  this.portrait = portrait;
});

function userSubName(required?: string) {
  return {
    trim: true,
    type: String,
    required: [!!required, required] as [boolean, string],
  };
}

function userSubContact(required: string, opts: Pick<SchemaTypeOptions<string>, "lowercase" | "validate"> = {}) {
  return new Schema<SubContact>(
    {
      other: {
        ...opts,
        trim: true,
        type: String,
        default: undefined,
      },
      primary: {
        ...opts,
        trim: true,
        type: String,
        required: [true, required],
      },
    },
    { _id: false }
  );
}

type Def<D extends UserBase> = {
  [K in keyof Omit<D, keyof UserBase>]: SchemaDefinitionProperty<D[K]>;
};
