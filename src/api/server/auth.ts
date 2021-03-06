/* eslint-disable @next/next/no-server-import-in-page */
import { importSPKI, jwtVerify } from "jose";

import { JWT_ALG, JWT_COOKIE_KEY } from "utils/constants";

import { UnauthorizedError } from "./error";

import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";

/**
 * It takes a request object and a token, and returns the payload of the JWT token if it's valid
 * @param {NextApiRequest | NextRequest} request - NextApiRequest | NextRequest - This is the request
 * object from Next.js.
 * @param {string} token - The JWT token to verify
 * @returns The payload of the JWT
 */
export async function verifyAuth(request: NextApiRequest | NextRequest, token: string) {
  const key = request.cookies[JWT_COOKIE_KEY];
  if (!key || !token) throw new UnauthorizedError("Missing Authentication Token");

  try {
    const { payload } = await jwtVerify(token, await importSPKI(key, JWT_ALG));
    return payload;
  } catch (error: unknown) {
    throw new UnauthorizedError("Invalid Authorization Token");
  }
}
