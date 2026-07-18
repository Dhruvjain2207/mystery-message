import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request:NextRequest){
    const session=await auth();
    const email=session?.user.email;
    const {newusername}=await request.json()
    try{
         await dbConnect();
         const usernameExists=await UserModel.findOne({username:newusername});
         if(usernameExists){
            return NextResponse.json({success:false,message:"Username already taken"},{status:409})
            }
            const user=await UserModel.findOne({email});
            if(!user){
                return NextResponse.json({success:false,message:"User not found"},{status:404})
            }
            user.username=newusername;
            await user.save()
            return NextResponse.json({success:true,message:"User updated successfully"},{status:201})
        
            
         

    }catch(error){
        console.error("error in updating username",error);
        return NextResponse.json({success:false,message:"error in updating username"},{status:500})
    }

}