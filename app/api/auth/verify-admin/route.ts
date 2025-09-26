import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { sessionCookie } = await req.json();

    if (!sessionCookie) {
      return NextResponse.json({ isAdmin: false, error: "No session cookie provided" }, { status: 400 });
    }

    // Verify session cookie and get user claims
    const decodedToken = await getAuth().verifySessionCookie(sessionCookie, true);
    const userRole = decodedToken.role || "user";
    
    return NextResponse.json({ 
      isAdmin: userRole === "admin",
      role: userRole,
      uid: decodedToken.uid 
    });

  } catch (error) {
    console.error("Admin verification error:", error);
    return NextResponse.json({ isAdmin: false, error: "Invalid session" }, { status: 401 });
  }
}
