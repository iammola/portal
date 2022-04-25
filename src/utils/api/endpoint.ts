import { parse } from "cookie";

import { ApiResult } from "types/api";
import { JWT_COOKIE_TOKEN } from "utils/constants";

/**
 * @param endpoint The API endpoint to fetch
 * @param init Fetch Options
 * @param body The Request Body for non-GET method requests
 */
export async function fetchAPIEndpoint<ResponseData, Body = undefined>(
  endpoint: RequestInfo,
  { body, ...init }: Omit<RequestInit, "body"> & { body?: Body } = {}
) {
  const JWT = parse(document.cookie)[JWT_COOKIE_TOKEN];

  const response = await fetch(endpoint, {
    ...init,
    body: JSON.stringify(body),
    headers: {
      ...init?.headers,
      Accept: "application/json",
      Authorization: JWT && `Bearer ${JWT}`,
    },
  });
  return (await response.json()) as ApiResult<ResponseData>;
}
