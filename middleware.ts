import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if ((pathname === "/auth" || pathname === "/auth/signup") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|public|api|favicon.ico).*)"],
};
