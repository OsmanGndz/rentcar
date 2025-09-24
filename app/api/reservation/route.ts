import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { userId, carId, pickupLocation, giveupLocation, startDate, endDate } =
      await req.json();

    if (!userId || !carId || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: "userId, carId, startDate, and endDate are required" },
        { status: 400 }
      );
    }

    const reservation = {
      userId,
      carId,
      pickupLocation: pickupLocation || null,
      giveupLocation: giveupLocation || null,
      status: "active",
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      createdAt: new Date(),
    };

    const docRef = await adminDb.collection("reservations").add(reservation);

    return NextResponse.json({
      success: true,
      message: "Reservation created successfully",
      reservationId: docRef.id,
    });
  } catch (error: any) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create reservation", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req:NextRequest) {
    try {
        const data = await adminDb.collection("reservations").get();

        if (data.empty) {
            return NextResponse.json({ success: true, reservations: [] });
        }

        const reservations = data.docs.map((doc)=>({
            resId: doc.id,
            ...doc.data(),
        }))

        return NextResponse.json({success:true, reservations})
    } catch (error:any) {
        return NextResponse.json({success:false, error:error.message},
             {status:500})
    }
}
