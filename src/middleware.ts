/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";

const publicPaths = new Set(["/login"]);

export function middleware(request: NextRequest) {
  const userCredencial = request.cookies.get("__token")?.value;
  const url = request.nextUrl.clone();
  const isPublicPath = publicPaths.has(url.pathname);

  if (userCredencial) {
    try {
      const token = JSON.parse(userCredencial);
      if (!token.token && !isPublicPath) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      if (isPublicPath) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (!isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/create",
    "/movie/:path*",
  ],
};

