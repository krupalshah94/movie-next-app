/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";

const publicPaths = new Set(["/login"]);

/**
 * Middleware function to handle authentication and redirection based on user credentials.
 *
 * This middleware checks if the user has a valid token in the request cookies.
 * If the user is not authenticated and tries to access a protected path, they
 * will be redirected to the login page. If the user is authenticated and tries
 * to access a public path like the login page, they will be redirected to the
 * home page. If there are no issues, the request proceeds to the next handler.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @returns {NextResponse} - A response object that either allows the request
 * to proceed or redirects to a different URL based on the authentication status.
 */
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
  matcher: ["/", "/login", "/create", "/movie/:path*"],
};
