import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";




export async function DELETE(){
     try{
        const session=await auth();
    if(!session?.user){
        return NextResponse.json({
            message:"User not found"
        },{status:404})
    }
    await dbConnect();
    const dbUser= await UserModel.findOne({email:session.user.email})
    if(!dbUser){
         return NextResponse.json({
            message:"User not found"
        },{status:404})
    }

    await UserModel.deleteOne({email:session.user.email})

     return NextResponse.json({
            message:"Account deleted Successfully"
        },{status:201})

    }catch(error){
         return NextResponse.json({
            message:"error in deleting the account"
        },{status:500})
    }

}