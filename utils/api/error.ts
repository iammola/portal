import { Error } from "mongoose";

/**
 * Extracts important information from error
 * @param {*} error
 * @return {*} the formatted error object
 */
export function formatError(error: any) {
  if (error instanceof Error.ValidationError)
    return Object.fromEntries(
      Object.entries(error.errors).map(([path, error]) => [
        path,
        error instanceof Error.ValidatorError ? error.properties.type : `Invalid ${error.path} type`,
      ])
    );

  if (error instanceof Error.MongooseServerSelectionError) return "Could not connect to server";

  return (error as Error).message;
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
