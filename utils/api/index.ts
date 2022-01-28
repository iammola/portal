import { Error as MongooseError } from "mongoose";

import { ApiResult } from "types/api";

/**
 *
 * @param endpoint The API endpoint to fetch
 * @param init Fetch Options
 * @param body The Request Body for non-GET method requests
 */
export async function fetchAPIEndpoint<
  ResponseData,
  Body = undefined,
  ResponseError = Record<string, undefined>
>(endpoint: string, init?: Omit<RequestInit, "body">, body?: Body) {
  const response = await fetch(endpoint, {
    ...init,
    body: JSON.stringify(body),
    headers: {
      ...init?.headers,
      Accept: "application/json",
    },
  });
  return (await response.json()) as ApiResult<ResponseData, ResponseError>;
}

export function formatApiError(error: any) {
  return error instanceof MongooseError.ValidationError
    ? Object.fromEntries(
        Object.entries(error.errors).map(([path, error]) => [
          path,
          error instanceof MongooseError.ValidatorError
            ? error.properties.type
            : error instanceof MongooseError.CastError
            ? `Invalid ${error.path} type`
            : error.name,
        ])
      )
    : error instanceof Error
    ? { message: error.message, name: error.name }
    : {};
}
