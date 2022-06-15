/* eslint-disable @next/next/no-server-import-in-page */
import { importSPKI, jwtVerify } from "jose";

import { JWT_ALG, JWT_COOKIE_KEY } from "utils/constants";

import { UnauthorizedError } from "./error";

import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";

/**
 * It verifies that the JWT token is valid by using the public key stored in the cookie
 * @param {NextApiRequest | NextRequest} request - NextApiRequest | NextRequest - This is the request
 * object that Next.js provides.
 * @param {string} token - The token to verify
 */
export async function verifyAuth(request: NextApiRequest | NextRequest, token: string) {
  const key = request.cookies[JWT_COOKIE_KEY];
  if (!key || !token) throw new UnauthorizedError("Missing Authentication Token");

  try {
    await jwtVerify(token, await importSPKI(key, JWT_ALG));
  } catch (error: unknown) {
    throw new UnauthorizedError("Invalid Authorization Token");
  }
}
