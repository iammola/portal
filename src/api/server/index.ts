import { Error } from "mongoose";
import { setCookies } from "cookies-next";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { StaffModel } from "db/models";
import { USER_ID_COOKIE } from "utils/constants";

import { verifyAuth } from "./auth";
import { NotFoundError, UnauthorizedError } from "./error";

import type { NextApiRequest, NextApiResponse } from "next";

export { NotFoundError, UnauthorizedError };

/**
 * It takes a request, a response, a route handler, an array of allowed methods and privileges. It
 * then checks if the request method is in the array of allowed methods, and if it is, it checks if the user
 * has the required privileges. If the user has the required privileges, it runs the route handler and
 * returns the response. If the user doesn't have the required privileges, it returns a `401` error. If
 * the request method isn't in the array of methods, it returns a `405` error
 * @param {NextApiRequest} req - NextApiRequest - The request object from Next.js
 * @param {NextApiResponse} res - NextApiResponse - The response object from Next.js
 * @param routeHandler - The function that will be called when the route is hit.
 * @param {API.METHOD[]} methods - An array of HTTP methods that the route supports.
 * @param {AllowedPrivileges} privileges - An object of user and staff privileges that are allowed to access the route.
 */
export async function routeWrapper<T extends object>(
  req: NextApiRequest,
  res: NextApiResponse,
  routeHandler: API.Handler<T>,
  methods: [API.METHOD, ...API.METHOD[]],
  privileges?: AllowedPrivileges
) {
  let data: API.RouteResponse<T> | null = null;

  try {
    if (req.url !== "/api/login") {
      const [type, token] = req.headers.authorization?.split(" ") ?? [];
      if (type === undefined) throw new UnauthorizedError(ReasonPhrases.UNAUTHORIZED);
      if (type !== "Bearer") throw new UnauthorizedError("Invalid Authentication Type");

      const { _id, level } = await verifyAuth(req, token);

      if (privileges) {
        const { user, staff } = privileges;

        if (!user.includes(level as Privilege)) throw new UnauthorizedError("Unable to access this resource");

        if (staff) {
          const user = await StaffModel.findById(_id, "privileges").lean();
          const checks = staff.every((privilege) => user?.privileges.includes(privilege));

          if (!checks) throw new UnauthorizedError("Insufficient privileges to access this resource");
        }
      }

      setCookies(USER_ID_COOKIE, _id, { req, res, secure: true, sameSite: true });
    }

    if (methods.includes(req.method as API.METHOD)) {
      await connect();
      data = (await routeHandler(req as never, res)) as API.RouteResponse<T> | null;
      if (data !== null) data[0].success = true;
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

type Privilege = "student" | "parent" | "staff" | `staff-${Schemas.Staff.Record["__type"]}`;

type AllowedPrivileges = {
  user: Privilege[];
  staff?: Schemas.Staff.Record["privileges"];
};

/**
 * It takes an error object and returns a string
 * @param {unknown} error - unknown - The error object that we want to format.
 * @returns An object with the key being the path and the value being the error message.
 */
function formatError(error: unknown) {
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
