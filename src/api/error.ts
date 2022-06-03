import { Error } from "mongoose";

/**
 * It takes an error object and returns a string
 * @param {unknown} error - unknown - The error object that we want to format.
 * @returns An object with the key being the path and the value being the error message.
 */
export function formatError(error: unknown) {
  if (error instanceof Error.ValidationError)
    return Object.fromEntries(
      Object.entries(error.errors).map(([path, error]) => [
        path,
        error instanceof Error.ValidatorError ? error.properties.type : `Invalid ${error.path} type`,
      ])
    );

  if (error instanceof Error.MongooseServerSelectionError) return "Could not connect to server";

  return (error as globalThis.Error).message;
}

export class NotFoundError extends globalThis.Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends globalThis.Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}
