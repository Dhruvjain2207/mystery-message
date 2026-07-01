import { EmailTemplate } from "@/components/emailTemplate";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export async function  sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
) {
  try {
     await resend.emails.send({
       from: 'Mystery Message <noreply@dhruv.store>',
      to:email,
      subject: 'Mystery Message || Verification Code',
      react: EmailTemplate({username,otp:verifyCode}),
     })
    return {success:true,
        message:" verification email sent successfully"
    }
    
  } catch (error) {
    console.error("Error sending verification email",error)
    return {success:false,
        message:"Error sending verification email"
    }
    
  }
}