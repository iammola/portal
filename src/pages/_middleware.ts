import { NextMiddleware, NextResponse } from "next/server";

import { JWT_COOKIE_TOKEN, REDIRECT_QUERY, USER_LEVEL_COOKIE } from "utils/constants";

export const middleware: NextMiddleware = (req) => {
  const url = req.nextUrl.clone();
  const key = req.cookies[JWT_COOKIE_TOKEN];
  const level = req.cookies[USER_LEVEL_COOKIE];

  // Allow `/login`, API routes and Public files
  if (/^\/login$|^\/api\/|\.(.*)$/.test(url.pathname)) return NextResponse.next();

  if (!key || !level) {
    if (url.pathname !== "/") url.searchParams.set(REDIRECT_QUERY, url.pathname);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
};
