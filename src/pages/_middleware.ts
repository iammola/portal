import { NextMiddleware, NextResponse } from "next/server";

import { JWT_COOKIE_TOKEN } from "utils";

export const middleware: NextMiddleware = (req) => {
  const key = req.cookies[JWT_COOKIE_TOKEN];
  const authRoutes = ["/login", "/api/login"];

  if (!authRoutes.includes(req.nextUrl.pathname) && !key) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};
