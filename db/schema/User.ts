import PhoneNumber from "awesome-phonenumber";
import { Schema, SchemaTypeOptions } from "mongoose";

import { hashPassword } from "utils";

import type {
  UserName as NameSchemaType,
  UserImage as ImageSchemaType,
  UserContact as ContactSchemaType,
  UserPassword as PasswordSchemaType,
  UserSubContact as SubContactSchemaType,
} from "types/schema/User";

const emailValidator = (v?: string) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v ?? "");

export const userGender = () => ({
  type: String,
  required: [true, "User Gender required"] as [true, string],
});

export const userDOB = (
  obj: { required: [true, string] } | { default: undefined }
) => ({
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

const userSubName = (required: string) => ({
  trim: true,
  type: String,
  required: [true, required] as [true, string],
});

const userSubContact = (
  required: string,
  withOther?: false,
  opts: Pick<SchemaTypeOptions<string>, "lowercase" | "validate"> = {}
) =>
  new Schema<Required<SubContactSchemaType<true>>>(
    {
      other: !withOther && {
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

export const userName = (withTitle?: false | undefined) =>
  new Schema<NameSchemaType<true>>(
    {
      last: userSubName("Last name required"),
      full: userSubName("Full name required"),
      other: userSubName("Other name required"),
      first: userSubName("First name required"),
      initials: userSubName("Initials required"),
      username: {
        unique: true,
        immutable: true,
        ...userSubName("User name required"),
      },
      title: !withTitle && userSubName("Title required"),
    },
    { _id: false }
  );

export const userContact = (withOther?: false | undefined) =>
  new Schema<ContactSchemaType>(
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

export const userPassword = (required: string) => ({
  set: hashPassword,
  type: new Schema<PasswordSchemaType>(
    {
      hash: {
        type: String,
        required: [true, "Password Hash required"],
      },
      salt: {
        type: String,
        required: [true, "Password Salt required"],
      },
    },
    { _id: false }
  ),
  required: [true, required] as [true, string],
});

export const UserImage = new Schema<ImageSchemaType>(
  {
    cover: {
      type: String,
      default: undefined,
    },
    portrait: {
      type: String,
      default: undefined,
    },
  },
  { _id: false }
);
