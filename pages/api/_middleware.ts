import { NextResponse } from "next/server";

import { verifyAuth } from "utils/auth";

import type { NextMiddleware } from "next/server";

export const middleware: NextMiddleware = async (request) => {
  if (request.nextUrl.pathname === "/api/auth") return NextResponse.next();

  return (await verifyAuth(request)) ?? NextResponse.next();
};
