//     /u/[username]  =>  api call (POST API)  =>return user exists or not

import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";


export async function GET(request:Request){
   const {searchParams}=new URL(request.url)
   const username=searchParams.get("username")
   if (!username?.trim()) {
  return Response.json(
    { success: false, message: "Username is required" },
    { status: 400 }
  );
}
   try {
    await dbConnect()
    const user=await UserModel.findOne({username,isVerified:true})
    if(!user){
     return Response.json({success:false,message:"User not found"},{status:404})
    }
     return Response.json({success:true,message:"Username is Valid"},{status:200})


   } catch (error) {
    console.error("error in verifying username",error)
    return Response.json({success:false,message:"error in verifying username"},{status:500})
    
   }
}