import { passwordStrength } from "check-password-strength";

/**
 * It loads the zxcvbn-ts library and its options, and returns a function that can be used to check the
 * strength of a password
 * @returns A function that takes a password and returns a result.
 */
export async function checkPasswordStrength(password: string) {
  passwordStrength(password);
}
