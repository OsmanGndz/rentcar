import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../services/firebase";

export async function checkUserExist(uid:string) {
    try {
        const userRef = await doc(db, "users", uid)
        const userSnap = await getDoc(userRef)

        if(userSnap.exists()) return true;
        else return false;
    } catch (error) {
        NextResponse.json({error:"While checking user exist error happened"}, {status: 500} )
    }
}

export async function POST(req: NextRequest) {
    try {
        const {name, email, uid} = await req.json();
        const user = {
            uid,
            name,
            email,
            role: "user",
            createdAt: new Date(),
        };
        await setDoc(doc(db, "users", uid), user)
        return NextResponse.json({status:200})      
   
    } catch (error) {
        return NextResponse.json({error: "While registering, error happened."}, {status: 500})
    }
}