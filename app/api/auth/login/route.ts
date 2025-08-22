import { auth } from "../../../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "../../../../lib/firebaseAdmin";


export async function POST(req:NextRequest){
    const {email, password} = await req.json();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;

        const idToken = await user.getIdToken();

        if(!idToken){
            return NextResponse.json({error: "ther is no token"})
        }

        const expiresIn = 60 * 5 * 1000;

        const sessionCookie = await adminAuth.createSessionCookie(idToken, {expiresIn});

        const response = NextResponse.json({message: "Log In successful"}, {status: 200})

        response.cookies.set("session", sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: expiresIn / 1000,
            path: "/",
        })

        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:400});
    }

}