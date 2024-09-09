import mongoose from "mongoose";



const driverSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    phone:{
        type:String,
        unique:true
    },
    adharCard:String,
    panCard:String,
    adharDoc:[],
    panDoc:[],
    dl:[],
    img:[],
    address:String
},{
    timestamps:true
});


export const Driver = mongoose.model("Driver",driverSchema);