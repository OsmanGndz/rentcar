import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../../../lib/firebaseAdmin";


export async function GET({params}:{params:{id:string}}){

    try {
        const data = await adminDb.collection("equipments").doc(params.id).get();

        if(!data.exists){
            return NextResponse.json({success: false, error: "Equipment not found"}, {status: 404})
        }

        return NextResponse.json({success: true, equipment: data.data()})
    } catch (error) {
        return NextResponse.json({success: false, error: "Failed to fetch equipment"}, {status: 500})
    }
}

export async function PUT(req:NextRequest, {params}: {params:{id:string}}){

    try {
        const {name, type} = await req.json();

        await adminDb.collection("equipments").doc(params.id).update({
            name,
            type,
        })

        return NextResponse.json({success: true, message: "Equipment updated successfully"})
    } catch (error) {
        return NextResponse.json({success: false, error: "Failed to update equipment"}, {status: 500})
    }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Equipment ID is required" },
        { status: 400 }
      );
    }

    await adminDb.collection("equipments").doc(id).delete();

    return NextResponse.json({
      success: true,
      message: "Equipment deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting equipment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete equipment", errorMessage: error.message },
      { status: 500 }
    );
  }
}
