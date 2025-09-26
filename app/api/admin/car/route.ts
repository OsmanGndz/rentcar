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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const pageSize = parseInt(searchParams.get("pageSize") || "6");
    const lastVisible = searchParams.get("lastVisible");
    const category = searchParams.get("category"); // filtrelenecek kategori

    let query: FirebaseFirestore.Query = adminDb
      .collection("cars")
      .limit(pageSize);

    // kategori varsa ekle
    if (category) {
      query = adminDb
        .collection("cars")
        .where("category", "==", category)
        .limit(pageSize);
    }

    // lastVisible varsa startAfter uygula
    if (lastVisible) {
      const lastDoc = await adminDb.collection("cars").doc(lastVisible).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return NextResponse.json({ success: true, cars: [], nextPageToken: null });
    }

    const cars = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const carData = doc.data();
        const id = doc.id;

        // ekipman kontrolü
        let equipmentList: any[] = [];
        if (carData.equipment && carData.equipment.length > 0) {
          equipmentList = await Promise.all(
            carData.equipment.map(async (eqRef: any) => {
              const eqDoc = await adminDb
                .collection("equipments")
                .doc(eqRef._path.segments[1])
                .get();
              return eqDoc.exists ? { id: eqDoc.id, ...eqDoc.data() } : null;
            })
          );
        }

        return {
          id,
          ...carData,
          equipment: equipmentList.filter(Boolean),
        };
      })
    );

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    return NextResponse.json({
      success: true,
      cars,
      nextPageToken: lastDoc ? lastDoc.id : null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: `Failed to fetch cars. ${error.message}` },
      { status: 500 }
    );
  }
}

  
  
