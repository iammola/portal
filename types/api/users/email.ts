import { UserBase, UserType } from "types/schema";

export type UsersEmailRequestBody = {
  select?: string;
  mail: string;
  userType: UserType;
};

export type UsersEmailData = Pick<UserBase, "_id" | "schoolMail"> & {
  name: Pick<UserBase["name"], "initials" | "username" | "full">;
};
