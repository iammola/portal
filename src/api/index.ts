import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { verifyAuth } from "./auth";
import { formatError, NotFoundError, UnauthorizedError } from "./error";

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * It takes a request, a response, a route handler, and an array of allowed methods, and it returns a
 * response with the correct status code and headers
 * @param {NextApiRequest} req - NextApiRequest - The request object from Next.js
 * @param {NextApiResponse} res - NextApiResponse - The response object from Next.js
 * @param routeHandler - The function that will be called when the route is hit.
 * @param {API.METHOD[]} methods - An array of HTTP methods that the route supports.
 */
export async function routeWrapper<T extends object>(
  req: NextApiRequest,
  res: NextApiResponse,
  routeHandler: API.Handler<T>,
  methods: [API.METHOD, ...API.METHOD[]]
) {
  let data: API.RouteResponse<T> | null = null;

  try {
    if (req.url !== "/api/login") await verifyAuth(req);

    if (methods.includes(req.method as API.METHOD)) {
      data = (await routeHandler(req, res)) as API.RouteResponse<T>;
      if (data) data[0] = { ...data[0], success: true } as API.RouteResponse<T>[0];
    }
  } catch (error: unknown) {
    let [message, code] = [ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST];

    if (error instanceof NotFoundError) [message, code] = [ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND];

    if (error instanceof UnauthorizedError) [message, code] = [ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED];

    data = [
      {
        message,
        success: false,
        error: formatError(error),
      },
      code,
    ];
  }

  res
    .status(data?.[1] ?? StatusCodes.METHOD_NOT_ALLOWED)
    .setHeader("Allow", methods)
    .setHeader("Content-Type", "application/json")
    .json(
      data?.[0] ?? {
        success: false,
        error: ReasonPhrases.METHOD_NOT_ALLOWED,
        message: ReasonPhrases.METHOD_NOT_ALLOWED,
      }
    );
}

export { NotFoundError, UnauthorizedError };
export { fetchAPIEndpoint } from "./endpoint";
