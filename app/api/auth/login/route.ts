import { auth } from "../../../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const {email, password} = await req.json();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return NextResponse.json({uid:userCredential.user.uid, email:userCredential.user.email})
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:400});
    }

}