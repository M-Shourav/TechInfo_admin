import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // guest routes যেখানে লগইন না থাকা ইউজার যেতে পারবে
  const guestRoutes = ["/auth", "/auth/signup"];

  // ইউজার লগইন থাকলে guest রাউটে যাওয়া নিষেধ (redirect to home)
  if (guestRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ইউজার লগইন না থাকলে guest রাউট ছাড়া অন্য জায়গায় যাওয়া নিষেধ (redirect to /auth)
  if (!token && !guestRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
