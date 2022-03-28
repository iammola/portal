import { NextMiddleware, NextResponse } from "next/server";

import { JWT_COOKIE } from "utils/constants";

export const middleware: NextMiddleware = (req) => {
  const key = req.cookies[JWT_COOKIE];

  if (req.nextUrl.pathname !== "/login" && !key) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};
