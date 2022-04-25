import { pbkdf2Sync, randomBytes } from "crypto";

const PASSWORD_LENGTH = 64;
const PASSWORD_ITERATIONS = 1e5;
const PASSWORD_ENCODING = "hex";
const PASSWORD_DIGEST = "sha512";

/**
 * Hash a user's password for storing in a database
 * @param password The string to hash
 * @returns - {@link Schemas.User.Password} - The resulting object with the password's hash and salt
 */
export function hashPassword(password: string) {
  const salt = randomBytes(128).toString("base64");
  const hash = pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, PASSWORD_LENGTH, PASSWORD_DIGEST).toString(
    PASSWORD_ENCODING
  );

  return { salt, hash };
}

/**
 * Verify that an attempted password matches the stored hash
 * @param attempt The request password attemp
 * @param password{@link Schemas.User.Password} A user's stored password object
 * @param password.salt The salt string used to hash the password
 * @param password.hash The hashed password
 * @returns boolean. true if the attempt matches the password
 */
export function comparePassword(attempt: string, { salt, hash }: Schemas.User.Password) {
  const attemptHash = pbkdf2Sync(attempt, salt, PASSWORD_ITERATIONS, PASSWORD_LENGTH, PASSWORD_DIGEST).toString(
    PASSWORD_ENCODING
  );

  return hash === attemptHash;
}
