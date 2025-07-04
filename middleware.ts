import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // if not login than return auth
  const protectedRoutes = ["/", "/author"];

  // if user login then return home page
  const guestRoutes = ["/auth", "/auth/signup"];

  // if not login than return auth
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // if not login than return auth
  if (token && guestRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/author/:path*", // author ও তার সব সাব-পাথ
    "/auth",
    "/auth/signup",
  ],
};
