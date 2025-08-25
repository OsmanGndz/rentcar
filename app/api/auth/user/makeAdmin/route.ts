// app/api/users/makeAdmin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "../../../../../lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();

    await adminAuth.setCustomUserClaims(uid, { role: "admin" });
    await adminDb.collection("users").doc(uid).update({
        role:"admin"
    })

    return NextResponse.json({ message: "User promoted to admin" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
