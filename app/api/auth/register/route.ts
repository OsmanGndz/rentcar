import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "../../../../lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  try {
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    // Varsayılan rol ata
    await adminAuth.setCustomUserClaims(userRecord.uid, { role: "user" });

    // Admin SDK ile Firestore’a yaz
    await adminDb.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      email,
      role: "user",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Registration is successful" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
