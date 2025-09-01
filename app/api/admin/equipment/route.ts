import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../../lib/firebaseAdmin";


export async function POST(req: NextRequest){
    try {
        const {name, type} = await req.json();

        await adminDb.collection("equipments").add({
            name,
            type,
            createdAt: new Date()
        })

        return NextResponse.json({ success: true, message: "Equipment added successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to add equipment" }, {status:500});
    }
}

export async function GET(){

    try {
        const data = await adminDb.collection("equipments").get();

        const equipments = data.docs.map((doc)=>{
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        return NextResponse.json({success:true, equipments})
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch equipments" }, {status:500});
    }
}