import { NextMiddleware, NextResponse } from "next/server";

import { verifyAuth } from "api/server/auth";
import { JWT_COOKIE_TOKEN, REDIRECT_QUERY, USER_LEVEL_COOKIE } from "utils/constants";

export const middleware: NextMiddleware = async (req) => {
  const url = req.nextUrl.clone();
  const token = req.cookies[JWT_COOKIE_TOKEN];
  const level = req.cookies[USER_LEVEL_COOKIE];

  // Allow `/login`, API routes and Public files
  if (/^\/login$|^\/api\/|\.(.*)$/.test(url.pathname)) return NextResponse.next();

  try {
    if (!level) throw new Error("User Level Required");
    await verifyAuth(req, token);
  } catch (error) {
    if (url.pathname !== "/") url.searchParams.set(REDIRECT_QUERY, url.pathname);
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }
};
