import { DocumentId, SQuery } from "types/schema";
import { FlattenIntersection } from "types/utils";

export type UserType = "parent" | "teacher" | "student";

export type UserName = {
  other?: string;
  readonly username: string;
} & Record<"initials" | "title" | "full" | "first" | "last", string>;

export interface UserPassword {
  hash: string;
  salt: string;
}

export interface UserImage {
  cover?: string;
  portrait?: string;
}

export type UserSubContact = {
  primary: string;
  other?: string;
};

export type UserContact = Record<
  "email" | "phone" | "address",
  FlattenIntersection<UserSubContact>
>;

export type UserGender = "M" | "F";

export interface UserBase extends DocumentId {
  dob?: Date;
  name: UserName;
  image: UserImage;
  gender: UserGender;
  contact: UserContact;
  readonly schoolMail: string;
}

export interface UserVirtuals {
  password: UserPassword;
}

export interface UserStaticMethods<S> {
  /** Find a user by username */
  findByUsername(username: string): SQuery<S> | null;
  /** Find all users by username */
  findByUsername(username: string[]): SQuery<S>[];
  /** Find a user by school mail */
  findBySchoolMail(mail: string): SQuery<S> | null;
  /** Find all users by schoolMail */
  findBySchoolMail(mail: string[]): SQuery<S>[];
}
