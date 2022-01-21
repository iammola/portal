import type { UserBase, UserType } from "types/schema";

export type UsersEmailRequestBody = Pick<UserBase, "schoolMail"> & {
    select?: string;
    userType: UserType;
};

export type UsersEmailData = Pick<UserBase, "_id" | "schoolMail"> & {
    name: Pick<UserBase["name"], "initials" | "username" | "full">;
};
