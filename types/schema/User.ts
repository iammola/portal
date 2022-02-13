import type { DocumentId } from "types/schema";
import type { FlattenIntersection } from "types/utils";

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

export type UserSubContact<C = true> = {
  primary: string;
} & (C extends true
  ? {
      other?: string;
    }
  : unknown);

export type UserContact<C = true> = {
  [K in "email" | "phone" | "address"]: FlattenIntersection<UserSubContact<C>>;
};

export interface UserBase<T = true, C = true> extends DocumentId {
  dob?: Date;
  gender: "M" | "F";
  image: UserImage;
  name: UserName<T>;
  contact: UserContact<C>;
  password: UserPassword;
  readonly schoolMail: string;
}
