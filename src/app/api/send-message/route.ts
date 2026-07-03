import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";


export async function POST(request:Request){
    const {anonymousMessage,username}=await request.json()
    if(!anonymousMessage || !username){
        return Response.json({success:false,message:"failed to get message or username"},{status:400})
    }
    try {
        await dbConnect();
        const user=await UserModel.findOne({username,isVerified:true})
        if(!user){
            return Response.json({success:false,message:"User not found"},{status:404})
        }
        if(!user.isAcceptingMessages){
            return Response.json({success:false,message:"User is not accepting messages currently"},{status:403})
        }
        user.messages.push({
            content:anonymousMessage,
            createdAt:new Date()
        });
        await user.save()
        return Response.json({success:true,message:"Message sent successfully "},{status:200})
        
    } catch (error) {
        console.error("something went wrong",error)
        return Response.json({success:false,message:"falied to send the message"},{status:500})

        
    }


}