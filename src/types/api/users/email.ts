export interface UsersEmailRequestBody {
  select?: string;
  mail: string;
  userType: Schemas.User.Type;
}

export interface UsersEmailData extends Pick<Schemas.User.Base, "_id" | "schoolMail"> {
  name: Pick<Schemas.User.Base["name"], "initials" | "username" | "full">;
}
