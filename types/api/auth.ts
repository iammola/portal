export type AuthUser = {
  level: string;
  password: string;
  username: string;
};

export type AuthData = {
  token: string;
  expiresIn: number;
};
