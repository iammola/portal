import { UserBase, UserType } from "types/schema";

export interface UsersEmailRequestBody {
  select?: string;
  mail: string;
  userType: UserType;
}

export interface UsersEmailData extends Pick<UserBase, "_id" | "schoolMail"> {
  name: Pick<UserBase["name"], "initials" | "username" | "full">;
}
