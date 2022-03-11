import { importSPKI, jwtVerify } from "jose";

import { UnauthorizedError } from "utils/api";
import { JWT_ALG, JWT_COOKIE } from "utils/constants";

// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest } from "next/server";

export async function verifyAuth(request: NextRequest) {
  const key = request.cookies[JWT_COOKIE];
  const auth = request.headers.get("authentication")?.split(" ");

  if (!key || !auth) throw new UnauthorizedError("Missing Authentication Token");

  if (auth[0] !== "Bearer") throw new UnauthorizedError("Invalid Authentication Type");

  try {
    await jwtVerify(auth[1], await importSPKI(key, JWT_ALG));
  } catch (error) {
    throw new UnauthorizedError("Invalid Authorization Token");
  }
}
