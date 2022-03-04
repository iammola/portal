import { DocumentId } from "types/schema";
import { FlattenIntersection } from "types/utils";

export type UserType = "parent" | "teacher" | "student";

export type UserName<T> = {
  [K in "initials" | "full" | "first" | "last"]: string;
} & {
  other?: string;
  readonly username: string;
} & (T extends true ? { title: string } : unknown);

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

export interface UserBase<T = true> extends DocumentId {
  dob?: Date;
  image: UserImage;
  name: UserName<T>;
  gender: UserGender;
  contact: UserContact;
  readonly schoolMail: string;
}

export interface UserVirtuals {
  password: UserPassword;
}
