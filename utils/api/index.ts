import { serialize } from "cookie";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { verifyAuth } from "./auth";
import { formatError, NotFoundError, UnauthorizedError } from "./error";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiHandler, HandlerResponse, NextAPIResponse } from "types/api";

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
  routeHandler: ApiHandler<T>,
  methods: string[]
) {
  let data: HandlerResponse<T> | null = null;

  try {
    if (req.url !== "/api/auth") await verifyAuth(req);
    (res as NextAPIResponse).cookie = (name, raw, opts) => {
      const value = typeof raw === "object" ? JSON.stringify(raw) : String(raw);
      res.setHeader("Set-Cookie", serialize(name, value, opts));
    };

    if (methods.includes(req.method ?? "")) data = await routeHandler(req, res as NextAPIResponse);
  } catch (error) {
    let [message, code] = [ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST];

    if (error instanceof NotFoundError)
      [message, code] = [ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND];

    if (error instanceof UnauthorizedError)
      [message, code] = [ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED];

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

export { fetchAPIEndpoint } from "./endpoint";
