import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Routes only for guests (login/signup page)
  const guestRoutes = ["/auth", "/auth/login", "/auth/signup"];
  const publicRoutes = ["/", "/about", "/contact"]; // add others if needed

  // If user is already logged in, redirect away from login/signup
  if (guestRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is NOT logged in, and trying to access secure route
  const isPublic =
    publicRoutes.includes(pathname) || pathname.startsWith("/auth");
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
