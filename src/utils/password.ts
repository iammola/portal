import { pbkdf2Sync, randomBytes } from "crypto";

const PASSWORD_LENGTH = 64;
const PASSWORD_ITERATIONS = 1e5;
const PASSWORD_ENCODING = "hex";
const PASSWORD_DIGEST = "sha512";

/**
 * It takes a password, generates a random salt, and then uses the salt to hash the password
 * @param {string} password - The password to hash
 * @returns An object with two properties: salt and hash.
 */
export function hashPassword(password: string) {
  const salt = randomBytes(128).toString("base64");
  const hash = pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, PASSWORD_LENGTH, PASSWORD_DIGEST).toString(
    PASSWORD_ENCODING
  );

  return { salt, hash };
}

/**
 * It takes a password attempt and a password object, and returns true if the attempt matches hash
 * @param {string} attempt - The password that the user is trying to log in with.
 * @param obj - The object that contains the salt and hash.
 * @returns A boolean value.
 */
export function comparePassword(attempt: string, { salt, hash }: Schemas.User.Password) {
  const attemptHash = pbkdf2Sync(attempt, salt, PASSWORD_ITERATIONS, PASSWORD_LENGTH, PASSWORD_DIGEST).toString(
    PASSWORD_ENCODING
  );

  return hash === attemptHash;
}
