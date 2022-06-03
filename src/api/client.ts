import { getCookie } from "cookies-next";

import { JWT_COOKIE_TOKEN } from "utils/constants";

/**
 * It takes an endpoint, and an optional body, and returns the response data from the API
 * @param {RequestInfo} endpoint - The URL to fetch.
 * @param init - An object to initialize the fetch request
 * @returns the API response data
 */
export async function fetchAPIEndpoint<ResponseData>(
  endpoint: RequestInfo,
  init?: Omit<RequestInit, "body"> & { body?: never; method: "GET" | "DELETE" }
): Promise<API.Result<ResponseData>>;
export async function fetchAPIEndpoint<ResponseData, Body>(
  endpoint: RequestInfo,
  init: Omit<RequestInit, "body"> & { body: Body; method: "POST" | "PUT" | "SEARCH" }
): Promise<API.Result<ResponseData>>;

export async function fetchAPIEndpoint<ResponseData>(endpoint: RequestInfo, { body, ...init }: RequestInit = {}) {
  const JWT = getCookie(JWT_COOKIE_TOKEN);

  const response = await fetch(endpoint, {
    ...init,
    body: JSON.stringify(body),
    headers: {
      ...init.headers,
      Accept: "application/json",
      Authorization: JWT ? `Bearer ${JWT.toString()}` : "",
    },
  });

  return (await response.json()) as API.Result<ResponseData>;
}
