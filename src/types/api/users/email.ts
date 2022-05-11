export type UsersEmailRequestBody = {
  select?: string;
  mail: string;
  userType: Schemas.User.Type;
};

export type UsersEmailData = {
  name: Pick<Schemas.User.Base["name"], "initials" | "username" | "full">;
} & Pick<Schemas.User.Base, "_id" | "schoolMail">;
