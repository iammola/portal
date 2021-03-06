import {
  QueryOptions,
  Model,
  ProjectionType,
  Schema,
  SchemaDefinitionProperty,
  SchemaOptions,
  SchemaTypeOptions,
} from "mongoose";
const { parsePhoneNumber } = await import("awesome-phonenumber");

import { ModelNames } from "db";
import { generateSchoolMail, getImage, uploadImage } from "db/utils";

export const createUserSchema = <D extends Schemas.User.Base, M extends Model<D> = Model<D>>(
  obj: Def<D>,
  options?: SchemaOptions
) => {
  const schema = new Schema<Schemas.User.Base, M>(
    {
      ...obj,
      name: {
        type: UserName,
        required: [true, "Name required"],
      },
      username: {
        unique: true,
        immutable: true,
        ...userSubName("User name required"),
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
      },
      dob: {
        type: Date,
        default: undefined,
      },
      images: {
        type: UserImages,
        default: undefined,
      },
    },
    { ...options, versionKey: false }
  );

  schema.pre("save", function (next) {
    this.set("schoolMail", generateSchoolMail(this.username));
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
    function (username: string | string[], ...args: [ProjectionType<Schemas.User.Base>?, QueryOptions?]) {
      const format = (str: string) => str.replace(/^@?/, "");

      if (Array.isArray(username)) return this.find({ username: { $in: username.map((u) => format(u)) } }, ...args);
      return this.findOne({ username: format(username) }, ...args);
    }
  );

  schema.static(
    "findBySchoolMail",
    function (schoolMail: string | string[], ...args: [ProjectionType<Schemas.User.Base>?, QueryOptions?]) {
      if (Array.isArray(schoolMail)) return this.find({ schoolMail: { $in: schoolMail } }, ...args);
      return this.findOne({ schoolMail }, ...args);
    }
  );

  return schema as unknown as Schema<D, M>;
};

const UserName = new Schema<Schemas.User.Name>(
  {
    other: userSubName(),
    title: userSubName(),
    last: userSubName("Last name required"),
    full: userSubName("Full name required"),
    first: userSubName("First name required"),
    initials: userSubName("Initials required"),
  },
  { _id: false }
);

const UserContact = new Schema<Schemas.User.Contact>(
  {
    email: {
      type: userSubContact("Email required", {
        lowercase: true,
        validate: {
          msg: "Invalid email address",
          validator: (v?: string) => (v ? /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v) : true),
        },
      }),
    },
    phone: {
      type: userSubContact("Phone required", {
        validate: {
          msg: "Invalid phone number",
          validator: (v?: string) => (v ? parsePhoneNumber(v).isValid() : true),
        },
      }),
    },
    address: {
      type: userSubContact("Address required"),
    },
  },
  { _id: false }
);

const UserImages = new Schema<Schemas.User.Images>(
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

function userSubContact(required: string, opts: Pick<SchemaTypeOptions<string>, "lowercase" | "validate"> = {}) {
  return new Schema<Schemas.User.SubContact>(
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
        default: undefined,
      },
    },
    { _id: false }
  );
}

type Def<D extends Schemas.User.Base> = {
  [K in keyof Omit<D, keyof Schemas.User.Base>]: SchemaDefinitionProperty<D[K]>;
};
