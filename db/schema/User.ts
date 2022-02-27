import PhoneNumber from "awesome-phonenumber";
import { Schema, SchemaTypeOptions } from "mongoose";

import { getImage, uploadImage } from "utils/file";

import type {
  UserName as NameSchemaType,
  UserImage as ImageSchemaType,
  UserContact as ContactSchemaType,
  UserSubContact as SubContactSchemaType,
} from "types/schema/User";

const emailValidator = (v?: string) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v ?? "");

export const userGender = () => ({
  type: String,
  required: [true, "User Gender required"] as [true, string],
});

export const userDOB = (obj?: SchemaTypeOptions<Date>) => ({
  type: Date,
  ...obj,
});

export const userSchoolMail = () => ({
  trim: true,
  type: String,
  unique: true,
  lowercase: true,
  immutable: true,
  required: [true, "User school mail required"] as [true, string],
  validate: {
    validator: emailValidator,
    msg: "Invalid email address",
  },
});

const userSubName = (required?: string) => ({
  trim: true,
  type: String,
  required: [!!required, required] as [boolean, string],
});

const userSubContact = (
  required: string,
  withOther?: false,
  opts: Pick<SchemaTypeOptions<string>, "lowercase" | "validate"> = {}
) => {
  return new Schema<Required<SubContactSchemaType<true>>>(
    {
      other:
        withOther === undefined
          ? {
              ...opts,
              trim: true,
              type: String,
              default: undefined,
            }
          : {},
      primary: {
        ...opts,
        trim: true,
        type: String,
        required: [true, required],
      },
    },
    { _id: false }
  );
};

export const userName = (withTitle?: false) => {
  return new Schema<NameSchemaType<true>>(
    {
      other: userSubName(),
      last: userSubName("Last name required"),
      full: userSubName("Full name required"),
      first: userSubName("First name required"),
      initials: userSubName("Initials required"),
      username: {
        unique: true,
        immutable: true,
        ...userSubName("User name required"),
      },
      title: withTitle === undefined ? userSubName("Title required") : {},
    },
    { _id: false }
  );
};

export const userContact = (withOther?: false | undefined) => {
  return new Schema<ContactSchemaType>(
    {
      email: {
        required: [true, "User email required"],
        type: userSubContact("User email required", withOther, {
          lowercase: true,
          validate: [emailValidator, "Invalid email address"],
        }),
      },
      phone: {
        required: [true, "User phone required"],
        type: userSubContact("User phone required", withOther, {
          validate: [
            (v?: string) => PhoneNumber(v ?? "").isValid(),
            "Invalid phone number",
          ],
        }),
      },
      address: {
        required: [true, "User address required"],
        type: userSubContact("User address required", withOther),
      },
    },
    { _id: false }
  );
};

export const UserImage = new Schema<ImageSchemaType>(
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

UserImage.pre("save", async function (this: ImageSchemaType) {
  const [cover, portrait] = await Promise.all(
    [this.cover, this.portrait].map((url) =>
      url ? uploadImage(url) : undefined
    )
  );

  this.cover = cover;
  this.portrait = portrait;
});
