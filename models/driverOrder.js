import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    driverId:String,
    customerId: String,
    customerName: String,
    distance1: String,
    distance2: String,
    distance3: String,
    distance4: String,
    date1: String,
    date2: String,
    status: String,
    price: String,
    paymentStatus: String,
    type:String,
    otp:String,
  },
  { timestamps: true }
);


export const DriverOrder = mongoose.model("DriverOrder",orderSchema);