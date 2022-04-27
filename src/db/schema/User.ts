import PhoneNumber from "awesome-phonenumber";
import * as mongoose from "mongoose";

import { ModelNames } from "db";
import { generateSchoolMail } from "utils/user";
import { getImage, uploadImage } from "utils/file";

const emailValidator = (v?: string) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v ?? "");
};

export const createUserSchema = <D extends Schemas.User.Base, M extends mongoose.Model<D>>(obj: Def<D>) => {
  const schema = new mongoose.Schema<Schemas.User.Base, M>({
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
      validate: {
        validator: emailValidator,
        msg: "Invalid email address",
      },
    },
    dob: {
      type: Date,
      default: undefined,
    },
    images: {
      type: UserImages,
      default: undefined,
    },
  });

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

  schema.static(
    "findByUsername",
    function (
      username: string | string[],
      ...args: [mongoose.ProjectionType<Schemas.User.Base>?, mongoose.QueryOptions?]
    ) {
      if (Array.isArray(username)) return this.find({ username }, ...args);
      return this.findOne({ username }, ...args);
    }
  );

  schema.static(
    "findBySchoolMail",
    function (
      schoolMail: string | string[],
      ...args: [mongoose.ProjectionType<Schemas.User.Base>?, mongoose.QueryOptions?]
    ) {
      if (Array.isArray(schoolMail)) return this.find({ schoolMail }, ...args);
      return this.findOne({ schoolMail }, ...args);
    }
  );

  return schema as unknown as mongoose.Schema<D, M>;
};

const UserName = new mongoose.Schema<Schemas.User.Name>(
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

const UserContact = new mongoose.Schema<Schemas.User.Contact>(
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

const UserImages = new mongoose.Schema<Schemas.User.Images>(
  {
    cover: {
      type: String,
      get: getImage,
      default: undefined,
    },
    avatar: {
      type: String,
      get: getImage,
      default: undefined,
    },
  },
  { _id: false }
);

UserImages.pre("save", async function () {
  const [cover, avatar] = await Promise.all(
    [this.cover, this.avatar].map((url) => (url ? uploadImage(url) : undefined))
  );

  this.cover = cover;
  this.avatar = avatar;
});

function userSubName(required?: string) {
  return {
    trim: true,
    type: String,
    required: [!!required, required] as [boolean, string],
  };
}

function userSubContact(
  required: string,
  opts: Pick<mongoose.SchemaTypeOptions<string>, "lowercase" | "validate"> = {}
) {
  return new mongoose.Schema<Schemas.User.SubContact>(
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

type Def<D extends Schemas.User.Base> = {
  [K in keyof Omit<D, keyof Schemas.User.Base>]: mongoose.SchemaDefinitionProperty<D[K]>;
};
