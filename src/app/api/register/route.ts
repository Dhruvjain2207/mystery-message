import dbConnect from "@/lib/dbconnect";
import { sendVerificationEmail } from "@/lib/resend";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";



export async function POST(request:Request){
    const {username,email,password} = await request.json();
    await dbConnect();
    try{
        if(!username || !email || !password){
            return Response.json({success:false, message:"Missing required fields"}, {status:400});
         }
        const existingUserByEmail = await UserModel.findOne({email});
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                 return Response.json({success:false, message:"User already exists"}, {status:400});
            }
            else{
                if(existingUserByEmail.username==username){
                     if(password.length<6){
                 return Response.json({success:false, message:"password must be of 6 haracter long"}, {status:400});
            }
                     const verifyCode= String(Math.floor(100000 + Math.random() * 900000));
                    
                    const hashedPassword=await bcrypt.hash(password,10);
                    const user=await UserModel.findOneAndUpdate({email},{password:hashedPassword,verifyCode,
                         verifyCodeExpiresAt:new Date(Date.now()+60*60*1000)
                    })
                   const emailResponse= await sendVerificationEmail(email,username,verifyCode)
                   if (!emailResponse.success) {
                      return Response.json(
                     { success: false, message: "Failed to send verification email" },
                     { status: 500 }
                    );
}
                      return Response.json({success:true, message:"user saved and otp send to email"}, {status:201});


                }
                else{
                      return Response.json({success:false, message:"an unverified account already exist with this email id please use your original username and verify the account"}, {status:400});
                }

            }

          }
        else{
            const userExistByUsername=await UserModel.findOne({username});
            if(userExistByUsername){
                 return Response.json({success:false, message:"username already taken"}, {status:400});
            }
            if(password.length<6){
                 return Response.json({success:false, message:"password must be of 6 haracter long"}, {status:400});
            }
             const verifyCode= String(Math.floor(100000 + Math.random() * 900000));
         
            const hashedPassword=await bcrypt.hash(password,10);
          const user= await UserModel.create({
            username,email,password:hashedPassword,verifyCode,
             verifyCodeExpiresAt:new Date(Date.now()+60*60*1000)
          })
          const emailResponse= await sendVerificationEmail(email,username,verifyCode)
          if (!emailResponse.success) {
              return Response.json(
                { success: false, message: "Failed to send verification email" },
                { status: 500 }
           );
}
           return Response.json({success:true, message:"user saved and otp send to email"}, {status:201});
         


        }

    }catch(error){
        console.error("Error creating user:", error);
        return Response.json({success:false, message:"Error creating user"}, {status:500});
    }

}