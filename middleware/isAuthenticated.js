import JWT from "jsonwebtoken";
import { User } from "../models/user.js";

export const UserCheck = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) return res.status("Token not Exist");

    const user =  JWT.verify(token, process.env.JWT_SECRET);

    if (!user) return res.status(400).json({ msg: "Invalid Token" });

    const data = await User.findById({ _id: user?.id }, "_id email");

    if (!data) return res.status(400).json({ msg: "Invalid Token" });

    req.id = data?._id;
    req.email = data?.email;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Invalid Token", error });
  }
};
