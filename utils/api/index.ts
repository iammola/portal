import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { formatError } from "./error";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiHandler, HandlerResponse } from "types/api";

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
  res: NextApiResponse<HandlerResponse<T>[0]>,
  routeHandler: ApiHandler<T>,
  methods: string[]
) {
  let data: HandlerResponse<T> | null = null;

  try {
    if (methods.includes(req.method ?? "")) data = await routeHandler(req, res);
  } catch (error) {
    data = [
      {
        success: false,
        error: formatError(error),
        message: ReasonPhrases.BAD_REQUEST,
      },
      StatusCodes.BAD_REQUEST,
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
