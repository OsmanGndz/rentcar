import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../../lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { brand, model, price, image, category, technical, equipmentIds, } = await req.json();
    const equipmetRefs =equipmentIds.map((id:string)=>
        adminDb.collection("equipments").doc(id)
    )

    await adminDb.collection("cars").add({
      brand,
      model,
      price,
      image,
      technical,
      equipment: equipmetRefs,
      category,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.error("Error adding car:", error);
    return NextResponse.json({ success: false, error: "Failed to add car" }, { status: 500 });
  }
}

export async function GET() {
    try {
      const data = await adminDb.collection("cars").get();
  
      const cars = await Promise.all(
        data.docs.map(async (doc) => {  // async map
          const carData = doc.data();
          const id = doc.id;
  
          if (!carData.equipment || carData.equipment.length === 0) {
            return { ...carData, equipment: [] };
          }
  
          const equipmentList = await Promise.all(
            carData.equipment.map(async (eqRef: any) => {
              const eqDoc = await adminDb.collection("equipments").doc(eqRef._path.segments[1]).get();
              return eqDoc.exists ? { id: eqDoc.id, ...eqDoc.data() } : null;
            })
          );
  
          return {
            id,
            ...carData,
            equipment: equipmentList.filter(Boolean),
          };
        })
      );
  
      return NextResponse.json({ success: true, cars });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch cars. ${error.message}` },
        { status: 500 }
      );
    }
  }

  
  
