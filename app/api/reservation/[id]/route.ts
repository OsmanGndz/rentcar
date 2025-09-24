import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../../lib/firebaseAdmin";

export async function GET(req:NextRequest, {params}: {params: {id: string}}){
    try {
        const {id} = params;

        if(!id){
            return NextResponse.json({success:false, error: "Reservation id is required!"},{status:400})
        }

        const reservation = await adminDb.collection("reservations").doc(id).get();

        if (!reservation.exists) {
            return NextResponse.json(
              {success:false, error: "There is no reservation with this id!" },
              { status: 404 }
            );
        }

        return NextResponse.json({success:true, message: "Reservation information",
             data: {id:reservation.id, ...reservation.data()}})

    } catch (error) {
        console.error("Error fetching reservation:", error);
      return NextResponse.json(
        {sucess:false, error: "Failed to fetch reservation info" },
        { status: 500 }
      );
    }
}

export async function PUT(req:NextRequest, {params}: {params: {id: string}}){
    try {
        const {id} = params;

        if(!id){
            return NextResponse.json({success:false, error: "Reservation id is required!"},{status:400})
        }

        const reservationRef = adminDb.collection("reservations").doc(id);
        const reservation = await reservationRef.get();

        if (!reservation.exists) {
            return NextResponse.json(
                {success:false, error: "There is no reservation with this id!" },
                { status: 404 }
            );
        }

        const {
            pickupLocation,
            giveupLocation,
            startDate,
            endDate,
            status,
        } = await req.json();

        const updateData: any = {};

        if (typeof pickupLocation !== "undefined") updateData.pickupLocation = pickupLocation ?? null;
        if (typeof giveupLocation !== "undefined") updateData.giveupLocation = giveupLocation ?? null;
        if (typeof status !== "undefined") updateData.status = status;
        if (typeof startDate !== "undefined") updateData.startDate = startDate ? new Date(startDate) : null;
        if (typeof endDate !== "undefined") updateData.endDate = endDate ? new Date(endDate) : null;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                {success:false, error: "No valid fields provided to update"},
                {status:400}
            );
        }

        updateData.updatedAt = new Date();

        await reservationRef.update(updateData);

        const updatedReservation = await reservationRef.get();

        return NextResponse.json({
            success:true,
            message: "Reservation updated successfully",
            data: { id: updatedReservation.id, ...updatedReservation.data() }
        })

    } catch (error) {
        console.error("Error fetching reservation:", error);
      return NextResponse.json(
        {sucess:false, error: "Failed to update reservation" },
        { status: 500 }
      );
    }
}