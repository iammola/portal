import { NextMiddleware, NextResponse } from "next/server";

import { verifyAuth } from "api/server/auth";
import { JWT_COOKIE_TOKEN, REDIRECT_QUERY, USER_LEVEL_COOKIE } from "utils/constants";

export const middleware: NextMiddleware = async (req) => {
  const url = req.nextUrl.clone();
  const token = req.cookies[JWT_COOKIE_TOKEN];

  // Allow `/login`, API routes and Public files
  if (/^\/login$|^\/api\/|\.(.*)$/.test(url.pathname)) return NextResponse.next();

  try {
    const { level } = await verifyAuth(req, token);

    const response = NextResponse.next();
    const options = { path: "/", secure: true, httpOnly: true, sameSite: true };

    response.cookie(USER_LEVEL_COOKIE, String(level), options);
    return response;
  } catch (error) {
    if (url.pathname !== "/") url.searchParams.set(REDIRECT_QUERY, url.pathname);
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }
};
