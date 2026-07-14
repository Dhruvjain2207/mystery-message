import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import dbConnect from "./dbconnect";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User";
import Google from "next-auth/providers/google"



export const {handlers,signIn,signOut,auth}=NextAuth({
    providers:[
        Credentials({
            credentials:{
                email:{label:"Email",type:"email"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials,request){
                await dbConnect();
                const email=credentials?.email as string;
                const password=credentials?.password as string

                if(!email || !password){
                    throw new Error("Email or password not found")
                }
                const user=await UserModel.findOne({email})
                if(!user){
                    throw new Error("User not found")
                }
                if(!(user.isVerified)){
                  throw new Error("User is not verified")
                }
                const isMatch=await bcrypt.compare(password,user.password)
                if(!isMatch){
                     throw new Error("Incorrect PASSWORD")
                }
                return{
                    id:user._id.toString(),
                    email:user.email,
                    username:user.username,
                    isVerified:user.isVerified,
                    isAcceptingMessages:user.isAcceptingMessages
                }



            }
        }),
        Google({
            clientId:process.env.AUTH_GOOGLE_ID,
            clientSecret:process.env.AUTH_GOOGLE_SECRET
        })
    ],
    callbacks:{

       async signIn({user,account}){
        if(account?.provider=="google"){
            if(!user.email){
                return false;
            }

            await dbConnect();
            let dbuser=await UserModel.findOne({email:user.email})
            const emailUsernameBase = (user.email.split("@")[0] || "user")
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase() || "user";
            const usernameBase = (user.name || emailUsernameBase)
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase() || "user";

            if(!dbuser){
                dbuser=await UserModel.create({
                    username: `${usernameBase}-${crypto.randomUUID().slice(0, 8)}`,
                    email:user.email,
                    isVerified:true,
                    isAcceptingMessages:true,
                })
            } else if(
                user.name &&
                dbuser.username.startsWith(`${emailUsernameBase}-`)
            ){
                dbuser.username = `${usernameBase}-${crypto.randomUUID().slice(0, 8)}`;
                await dbuser.save();
            }

        }
        return true;
       },


       async jwt({token,user}){
        if(user?.email){
            await dbConnect();
            const dbuser=await UserModel.findOne({email:user.email})

            if(dbuser){
                token.id=dbuser._id.toString();
                token.username=dbuser.username;
                token.email=dbuser.email;
                token.isAcceptingMessages=dbuser.isAcceptingMessages;
                token.isVerified=dbuser.isVerified;
            }
               
        }
        return token
       },
       session({session,token}){
        if(session.user){
            session.user.id=token.id as string;
           session.user.username=token.username as string;
           session.user.email=token.email as string
           session.user.isVerified=token.isVerified as boolean;
           session.user.isAcceptingMessages=token.isAcceptingMessages as boolean
        }
        return session;
       }
    },
    session:{
        strategy:"jwt",
        maxAge:1000*60*60*24*10
    },
    pages:{
        signIn:'/login',
        error:'/login'
    },
    secret:process.env.AUTH_SECRET
})
