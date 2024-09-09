import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    otp:{
        type:String,
        unique:true
    },
    phone:{
        type:String,
        unique:true
    }
},{
    timestamps:true
});


export const User = mongoose.model("User",userSchema);