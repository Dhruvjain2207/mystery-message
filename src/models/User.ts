import mongoose from "mongoose";
interface User{
    username:string;
    email:string;
    password:string;

    createdAt?:Date;
    updatedAt?:Date;

    isVerified?:boolean;
    isAcceptingMessages?:boolean;

    messages?:Message[];

    verifyCode?:string;
    verifyCodeExpiresAt?:Date;

}
interface Message{
    content:string;
    createdAt?:Date;
    updatedAt?:Date;
}

const messageSchema = new mongoose.Schema<Message>({
    content:{
        type:String,
        required:true,
    }
},{timestamps:true});

const userSchema = new mongoose.Schema<User>({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,  
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    verifyCode:{
        type:String,
    },
    verifyCodeExpiresAt:{
        type:Date,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true
    },
    messages:{
        type:[messageSchema],
        default:[]
    }

},{timestamps:true});

const UserModel= mongoose.models.User || mongoose.model<User>("User",userSchema);
export default UserModel;
