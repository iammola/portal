import { serialize } from "cookie";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { formatError } from "./error";

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
    (res as NextAPIResponse).cookie = (name, raw, opts) => {
      const value = typeof raw === "object" ? JSON.stringify(raw) : String(raw);
      res.setHeader("Set-Cookie", serialize(name, value, opts));
    };

    if (methods.includes(req.method ?? "")) data = await routeHandler(req, res as NextAPIResponse);
  } catch (error) {
    const [message, code] =
      error instanceof NotFoundError
        ? [ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND]
        : [ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST];

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

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export { fetchAPIEndpoint } from "./endpoint";
