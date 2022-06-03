import { Error } from "mongoose";
import { importSPKI, jwtVerify } from "jose";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { JWT_ALG, JWT_COOKIE_KEY } from "utils/constants";

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
      try {
        if (req.body && typeof req.body === "string") req.body = JSON.parse(req.body) as Record<string, unknown>;
      } catch (error) {
        /*  */
      }

      data = (await routeHandler(req as never, res)) as API.RouteResponse<T>;
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

/**
 * It verifies that the JWT in the Authorization header matches the JWT in the cookie
 * @param {NextApiRequest} request - NextApiRequest - This is the request object that Next.js provides to the API route.
 */
export async function verifyAuth(request: NextApiRequest) {
  const key = request.cookies[JWT_COOKIE_KEY];
  const auth = request.headers.authorization?.split(" ");

  if (!key || !auth) throw new UnauthorizedError("Missing Authentication Token");

  if (auth[0] !== "Bearer") throw new UnauthorizedError("Invalid Authentication Type");

  try {
    await jwtVerify(auth[1], await importSPKI(key, JWT_ALG));
  } catch (error: unknown) {
    throw new UnauthorizedError("Invalid Authorization Token");
  }
}

/**
 * It takes an error object and returns a string
 * @param {unknown} error - unknown - The error object that we want to format.
 * @returns An object with the key being the path and the value being the error message.
 */
export function formatError(error: unknown) {
  if (error instanceof Error.ValidationError)
    return Object.fromEntries(
      Object.entries(error.errors).map(([path, error]) => [
        path,
        error instanceof Error.ValidatorError ? error.properties.type : `Invalid ${error.path} type`,
      ])
    );

  if (error instanceof Error.MongooseServerSelectionError) return "Could not connect to server";

  return (error as globalThis.Error).message;
}

export class NotFoundError extends globalThis.Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends globalThis.Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}
