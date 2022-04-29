import { getCookie } from "cookies-next";

import { JWT_COOKIE_TOKEN } from "utils/constants";

/**
 * It takes an endpoint, and an optional body, and returns the response data from the API
 * @param {RequestInfo} endpoint - The URL to fetch.
 * @param obj - An object with two properties, body and init
 * @returns the API response data
 */
export async function fetchAPIEndpoint<ResponseData, Body = undefined>(
  endpoint: RequestInfo,
  { body, ...init }: Omit<RequestInit, "body"> & { body?: Body } = {}
) {
  const JWT = getCookie(JWT_COOKIE_TOKEN);

  const response = await fetch(endpoint, {
    ...init,
    body: JSON.stringify(body),
    headers: {
      ...init?.headers,
      Accept: "application/json",
      Authorization: JWT ? `Bearer ${JWT.toString()}` : "",
    },
  });

  return (await response.json()) as API.Result<ResponseData>;
}
