import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../../../lib/firebaseAdmin";


export async function GET({params}:{params:{id:string}}){

    try {
        const data = await adminDb.collection("cars").doc(params.id).get();

        if(!data.exists){
            return NextResponse.json({success: false, error: "Car not found"}, {status: 404})
        }

        return NextResponse.json({success: true, car: data.data()})
    } catch (error) {
        return NextResponse.json({success: false, error: "Failed to fetch car"}, {status: 500})
    }
}

export async function PUT(req: NextRequest, {params}:{params:{id:string}}) {

    try {
      const { brand, model, price, image, category, technical, equipmentIds } = await req.json();

      const equipmentRefs = equipmentIds.map((id:string)=>{
        return adminDb.collection("equipments").doc(id)
      })

      await adminDb.collection("cars").doc(params.id).update({
        brand,
        model,
        price,
        image,
        category,
        technical,
        equipment: equipmentRefs,
      })

      return NextResponse.json({ success: true, message: "Car updated successfully" });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Failed to update car" }, { status: 500 });
    }
  }

  export async function DELETE(req:NextRequest, {params}:{params:{id:string}}){

    try {
      const id = params.id;

      if(!id){
        return NextResponse.json({ success: false, error: "Car ID is required" }, { status: 400 });
      }

      await adminDb.collection("cars").doc(id).delete();

      return NextResponse.json({success: true, message: "Car deleted successfully"});
    } catch (error) {
      return NextResponse.json({ success: false, error: "Failed to delete car" }, { status: 500 });
    }
  }