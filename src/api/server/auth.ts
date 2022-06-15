import { importSPKI, jwtVerify } from "jose";

import { JWT_ALG, JWT_COOKIE_KEY } from "utils/constants";

import { UnauthorizedError } from "./error";

import type { NextApiRequest } from "next";

/**
 * It verifies that the JWT token is valid by using the public key stored in the cookie
 * @param {NextApiRequest | NextRequest} request - NextApiRequest | NextRequest - This is the request
 * object that Next.js provides.
 * @param {string} token - The token to verify
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
