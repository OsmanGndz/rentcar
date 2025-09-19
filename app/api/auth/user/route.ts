import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "../../../../lib/firebaseAdmin";
import { error } from "console";

async function checkUserExist(uid: string) {
  try {
    const userSnap = await adminDb.collection("users").doc(uid).get();
    return userSnap.exists;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { uid, name, email } = await req.json();

    const exists = await checkUserExist(uid);
    if (!exists) {
      await adminAuth.setCustomUserClaims(uid, { role: "user" });

      const user = {
        uid,
        name,
        email,
        role: "user",
        createdAt: new Date(),
      };
  
      await adminDb.collection("users").doc(uid).set(user);
      return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
    }
    
    return NextResponse.json({ message: "User already exists" }, { status: 200 });
    
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}


