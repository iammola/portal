import { importSPKI, jwtVerify } from "jose";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { JWT_ALG, JWT_COOKIE } from "utils/constants";

// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest } from "next/server";

const jsonResponse = (
  message: string,
  status = StatusCodes.BAD_REQUEST,
  error = ReasonPhrases.BAD_REQUEST
) => {
  const success = false;

  return new Response(JSON.stringify({ error, message, success }), {
    status,
    statusText: message,
  });
};

export async function verifyAuth(request: NextRequest) {
  const key = request.cookies[JWT_COOKIE];
  const auth = request.headers.get("authentication")?.split("");

  if (!key || !auth) return jsonResponse("Missing Authentication Token");

  if (auth[0] !== "Bearer") return jsonResponse("Invalid Authentication Type");

  try {
    await jwtVerify(auth[1], await importSPKI(key, JWT_ALG));
  } catch (error) {
    return jsonResponse(
      "Invalid Authorization Token",
      StatusCodes.UNAUTHORIZED,
      ReasonPhrases.UNAUTHORIZED
    );
  }
}
