// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  // Protect admin routes with role verification
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    // Check admin role by calling our API endpoint
    try {
      const response = await fetch(new URL("/api/auth/verify-admin", req.url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionCookie: session }),
      });

      if (!response.ok) {
        console.log("API response not ok:", response.status);
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const data = await response.json();
      console.log("Admin verification data:", data);
      
      // If user is not admin, redirect to home
      if (!data.isAdmin) {
        console.log("User is not admin, redirecting to home");
        return NextResponse.redirect(new URL("/", req.url));
      }
      
      console.log("User is admin, allowing access");
      // If user is admin, allow access to admin page
      return NextResponse.next();
    } catch (error) {
      console.error("Admin verification error:", error);
      // If verification fails, redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect other authenticated pages (dashboard, profile, etc.)
  if (pathname.startsWith("/my-account") || pathname.startsWith("/my-payments") || 
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
  matcher: ["/admin/:path*", "/admin", "/login", "/register", "/my-account", "/my-payments", "/my-reservations"],
};
