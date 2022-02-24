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
        error instanceof Error.ValidatorError
          ? error.properties.type
          : `Invalid ${error.path} type`,
      ])
    );

  return (error as Error).message;
}
