import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { isAcceptingMessages } = await request.json();

    if (typeof isAcceptingMessages !== "boolean") {
      return NextResponse.json(
        { success: false, message: "isAcceptingMessages must be a boolean" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await UserModel.findOneAndUpdate(
      { email: session.user.email },
      { isAcceptingMessages },
      { new: true }
    ).select("isAcceptingMessages");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message acceptance updated",
        isAcceptingMessages: user.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating message acceptance:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
