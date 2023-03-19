import { NextResponse } from "next/server";
import { APP_BASE_URL } from "src/constants/configs";

export function middleware(request) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(`${APP_BASE_URL}/shop`);
  }
}
