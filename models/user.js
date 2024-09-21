import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,

    phone: {
      type: String,
      unique: true,
    },
    accountOtp: {
      type: Number,
      unique: true,
    },
    otp:{
        type:String
    },
    otpExpiary:{
        type:Date
    }
    
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
