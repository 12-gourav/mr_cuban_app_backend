import { User } from "../models/user.js";
import { ErrorMsg } from "../utils/Error.js";
import JWT from "jsonwebtoken";

async function generateUniqueOtp() {
  let otp;
  let isUnique = false;

  do {
    otp = Math.floor(1000 + Math.random() * 9000).toString();
    const existingUser = await User.findOne({ otp });
    if (!existingUser) {
      isUnique = true;
    }
  } while (!isUnique);

  return otp;
}

export const User_Register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existuser = await User.findOne({
      $or: [{ phone: phone }, { email: email.toLowerCase() }],
    });

    if (existuser) return res.status(400).json({ msg: "User already exist!" });

    const otp = await generateUniqueOtp();
    const data = await User.create({ name, email, password, phone});

    const token = await JWT.sign(
      { id: data?._id, email: data?.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(201)
      .json({ msg: "User Register Successfully", data: data, token });
  } catch (error) {
    ErrorMsg(res, error);
  }
};


export const User_Login = async (req, res) => {
    try {
      const { email, password} = req.body;

      console.log(email,password)

      return res.status(200).json({data:[],token:"fdfsfss"})
  
      const existuser = await User.findOne({
        $or: [ { email: email.toLowerCase() }],
      });

      if(!existuser) return res.status(400).json({msg:"Invalid Credintials"});
  
      const checkPassword = existuser.password===password;
      if(!checkPassword) return res.status(400).json({msg:"Invalid Credintials"});
      const token =  JWT.sign(
        { id: data?._id, email: data?.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
  
      res
        .status(201)
        .json({ msg: "User Register Successfully", data: existuser, token });
    } catch (error) {
      ErrorMsg(res, error);
    }
  };


export const LoadUser = async (req,res)=>{
    try {
      const data = await User.findOne({_id:req.id});
      
      return res.status(200).json({msg:"User Fetch",data});
        
    } catch (error) {
        ErrorMsg(res,error);
    }
}


export const User_Update = async (req, res) => {
    try {
      const { name, password, phone,id } = req.body;
  
      const data = await User.findOneAndUpdate({_id:id},{name,password,phone},{new:true})
      res
        .status(201)
        .json({ msg: "User Update Successfully", data: data,  });
    } catch (error) {
      ErrorMsg(res, error);
    }
  };