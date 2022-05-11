import { importSPKI, jwtVerify } from "jose";

import { JWT_ALG, JWT_COOKIE_KEY } from "utils";

import { UnauthorizedError } from "./error";

import type { NextApiRequest } from "next";

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
