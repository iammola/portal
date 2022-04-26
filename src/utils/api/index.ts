import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { verifyAuth } from "./auth";
import { formatError, NotFoundError, UnauthorizedError } from "./error";

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Used to catch errors in a route and properly format response object
 *
 * @param req {@link NextApiRequest}
 * @param res {@link NextApiResponse}
 * @param routeHandler Handler to this routes functions
 * @param methods THe HTTP methods allowed on this route
 */
export async function routeWrapper<T extends object>(
  req: NextApiRequest,
  res: NextApiResponse,
  routeHandler: API.Handler<T>,
  methods: string[]
) {
  let data: API.RouteResponse<T> | null = null;

  try {
    if (req.url !== "/api/auth") await verifyAuth(req);

    if (methods.includes(req.method ?? "")) {
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
