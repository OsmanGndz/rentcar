// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  // Protect admin, dashboard and profile pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard") || 
      pathname.startsWith("/my-account") || pathname.startsWith("/my-payments") || 
      pathname.startsWith("/my-reservations")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // Prevent authenticated users from accessing auth pages
  if ((pathname === "/login" || pathname === "/register") && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/admin", "/login", "/register", "/my-account", "/my-payments", "/my-reservations"],
};
