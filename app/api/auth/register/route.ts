import { NextRequest, NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../services/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const {name, email, password } = await req.json();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if(!userCredential){
      return NextResponse.json({
        error: "While registering, error happened."
      }, {status:500})
    }

    const user = userCredential.user

    await setDoc(doc(db,"users", user.uid),{
      uid: user.uid,
      name,
      email,
      role: "user",
      createdAt: new Date(),
    })

    return NextResponse.json({
      uid: user.uid,
      email: user.email,
      name,
    }, {status:201})
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
