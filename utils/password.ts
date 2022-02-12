import { pbkdf2Sync, randomBytes } from "crypto";

import type { UserPassword } from "types/schema";

const PASSWORD_LENGTH = 64;
const PASSWORD_ITERATIONS = 1e5;
const PASSWORD_ENCODING = "hex";
const PASSWORD_DIGEST = "sha512";

export function hashPassword(password: string) {
  const salt = randomBytes(128).toString("base64");
  const hash = pbkdf2Sync(
    password,
    salt,
    PASSWORD_ITERATIONS,
    PASSWORD_LENGTH,
    PASSWORD_DIGEST
  ).toString(PASSWORD_ENCODING);

  return { salt, hash };
}

export const comparePassword = (
  attempt: string,
  { salt, hash }: UserPassword
) =>
  hash ===
  pbkdf2Sync(
    attempt,
    salt,
    PASSWORD_ITERATIONS,
    PASSWORD_LENGTH,
    PASSWORD_DIGEST
  ).toString(PASSWORD_ENCODING);
