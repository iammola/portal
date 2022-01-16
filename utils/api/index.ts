import { APIResult } from "types/api";

/**
 *
 * @param endpoint The API endpoint to fetch
 * @param init Fetch Options
 * @param body The Request Body for non-GET method requests
 */
export async function fetchAPIEndpoint<ResponseData, ResponseError, Body>(
    endpoint: string,
    init?: Omit<RequestInit, "body">,
    body?: Body
) {
    const response = await fetch(endpoint, {
        ...init,
        body: JSON.stringify(body),
        headers: {
            ...init?.headers,
            Accept: "application/json",
        },
    });
    return (await response.json()) as APIResult<ResponseData, ResponseError>;
}
