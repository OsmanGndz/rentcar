import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../../../lib/firebaseAdmin";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
  
      if (!id) {
        return NextResponse.json(
          { error: "UID is required" },
          { status: 400 }
        );
      }
  
      const userDoc = await adminDb.collection("users").doc(id).get();
  
      if (!userDoc.exists) {
        return NextResponse.json(
          { error: "There is no user with this id!" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        message: "Information is given!",
        user: { id: userDoc.id, ...userDoc.data() },
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json(
        { error: "Failed to fetch user info" },
        { status: 500 }
      );
    }
  }
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
      const { name } = await req.json();

      if (!id) {
        return NextResponse.json(
          { error: "UID is required" },
          { status: 400 }
        );
      }

      if (!name) {
        return NextResponse.json(
          { error: "name is required" },
          { status: 400 }
        );
      }

      const userDoc = await adminDb.collection("users").doc(id).get();

      if (!userDoc.exists) {
        return NextResponse.json(
          { error: "There is no user with this id!" },
          { status: 404 }
        );
      }

      const updateData: any = {};

      if (name) updateData.name = name;

      await adminDb.collection("users").doc(id).update(updateData);

      const updatedUserDoc = await adminDb.collection("users").doc(id).get();

      return NextResponse.json({
        message: "User updated successfully!",
        user: { id: updatedUserDoc.id, ...updatedUserDoc.data() },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { error: "Failed to update user info" },
        { status: 500 }
      );
    }
  }