import { User } from "../models/user.js";

export const OTP_Generator = async ()=> {
    let otp;
    let isUnique = false;
  
    do {
      otp = Math.floor(1000 + Math.random() * 9000).toString();
      const existingUser = await User.findOne({ accountOtp: otp });
      if (!existingUser) {
        isUnique = true;
      }
    } while (!isUnique);
  
    return otp;
  }