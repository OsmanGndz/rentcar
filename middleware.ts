// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "./lib/firebaseAdmin"; // kendi adminAuth export'unu kullan
// yukarıda firebase-admin/app initialize ettiğin dosyadan import

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Session cookie verify
    const decoded = await adminAuth.verifySessionCookie(session, true);

    // Role kontrolü (custom claim üzerinden geliyor)
    const role = (decoded as any).role; // claim role bilgisini aldık
    console.log("role: ", role)
    if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware auth error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
