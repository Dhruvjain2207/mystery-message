import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest){
    const {code}=await request.json()
    const url=new URL(request.url)
    const email=url.searchParams.get("email")
    
    try{
        await dbConnect()
        if (!code) {
    return NextResponse.json(
        { success: false, message: "OTP is required" },
        { status: 400 }
    );
}
        if (!email) {
    return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
    );
}
        const user=await UserModel.findOne({email,isVerified:false})
        if(!user){
            return NextResponse.json({success:false, message:"user not found"}, {status:404});
        }
        if (
  !user.verifyCodeExpiresAt ||
  user.verifyCodeExpiresAt.getTime() < Date.now()
) {
  return NextResponse.json(
    {
      success: false,
      message: "OTP has expired",
    },
    { status: 400 }
  );
}
       
        if(code===user.verifyCode){
            user.isVerified=true;
            user.verifyCode = undefined;
            user.verifyCodeExpiresAt = undefined;
            await user.save()

        }
        else{
             return NextResponse.json({success:false, message:"Wrong otp"}, {status:400});
        }
        return NextResponse.json({success:true, message:"User verified successfully"}, {status:200});
        




    }catch(error){
        console.error("error in verifying otp",error);
         return NextResponse.json({success:false, message:"failed to verify the otp"}, {status:500});

    }
}