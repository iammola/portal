import { importSPKI, jwtVerify } from "jose";

import { JWT_ALG, JWT_COOKIE } from "utils/constants";

import { UnauthorizedError } from "./error";

import type { NextApiRequest } from "next";

export async function verifyAuth(request: NextApiRequest) {
  const key = request.cookies[JWT_COOKIE];
  const auth = (request.headers.authentication as string)?.split(" ");

  if (!key || !auth) throw new UnauthorizedError("Missing Authentication Token");

  if (auth[0] !== "Bearer") throw new UnauthorizedError("Invalid Authentication Type");

  try {
    await jwtVerify(auth[1], await importSPKI(key, JWT_ALG));
  } catch (error) {
    throw new UnauthorizedError("Invalid Authorization Token");
  }
}
