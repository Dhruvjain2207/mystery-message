import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";



export async function GET(){
   try {
     await dbConnect();
    const session=await auth();

    if(!session?.user){
        return NextResponse.json({success:false,message:"Unauthorized"},{status:401})
    }
    const user=await UserModel.findOne({email:session.user.email}).select("messages isAcceptingMessages")
    if(!user){
         return NextResponse.json({success:false,message:"User not Found"},{status:404})
    }
     return NextResponse.json({success:true,messages:user.messages,isAcceptingMessages:user.isAcceptingMessages},{status:200})
   } catch (error) {
    console.error("Error fetching messages:",error)
     return NextResponse.json({success:false,message:"Internal Server Error"},{status:500})
    
   }

}
