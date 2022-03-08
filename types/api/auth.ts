export interface AuthUser {
  level: string;
  password: string;
  username: string;
  remember: boolean;
}

export interface AuthData {
  token: string;
  expiresIn: number;
}
