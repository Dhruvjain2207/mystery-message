import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { auth } from "@/lib/auth";

export async function DELETE(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const { messageId } = await request.json();

  if (!messageId) {
    return Response.json(
      {
        success: false,
        message: "Message id is required",
      },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const user = await UserModel.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    user.messages = user.messages.filter(
      (message: any) => message._id.toString() !== messageId
    );

    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}