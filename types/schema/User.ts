import { QueryOptions } from "mongoose";

import { DocumentId, SQuery } from "types/schema";
import { FlattenIntersection } from "types/utils";

export type UserType = "parent" | "teacher" | "student";

export interface UserName extends Record<"initials" | "title" | "full" | "first" | "last", string> {
  other?: string;
  readonly username: string;
}

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

export type UserContact = Record<"email" | "phone" | "address", FlattenIntersection<UserSubContact>>;

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
  findByUsername(username: string, projection?: any, options?: QueryOptions): SQuery<S, S, unknown, UserVirtuals>;
  /** Find all users by username */
  findByUsername(username: string[], projection?: any, options?: QueryOptions): SQuery<S[], S, unknown, UserVirtuals>;
  /** Find a user by school mail */
  findBySchoolMail(mail: string, projection?: any, options?: QueryOptions): SQuery<S, S, unknown, UserVirtuals>;
  /** Find all users by schoolMail */
  findBySchoolMail(mail: string[], projection?: any, options?: QueryOptions): SQuery<S[], S, unknown, UserVirtuals>;
}
