import { NextRequest, NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../services/firebase";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Gerekirse Firestore'da kullanıcı kaydı oluşturabilirsin
    // await setDoc(doc(db, "users", userCredential.user.uid), { email });

    return NextResponse.json({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
