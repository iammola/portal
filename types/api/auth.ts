export type AuthUser = {
  level: string;
  password: string;
  username: string;
  remember: boolean;
};

export type AuthData = {
  token: string;
  expiresIn: number;
};
