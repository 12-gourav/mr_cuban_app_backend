import { DriverOrder } from "../models/driverOrder.js";
import { Lead } from "../models/lead.js";
import { CustomerOrder } from "../models/order.js";
import { Driver } from "../models/driver.js";
import { Notification } from "../models/notification.js";
import {User} from "../models/user.js"

export const CreateLead = async (req, res) => {
  try {
    const {
      pickup,
      drop,
      type,
      returnPickup,
      returnDrop,
      pickdate,
      dropdate,
      id,
      otp,
      seat,
    } = req.body;

    const pickupdate = new Date(pickdate).toLocaleDateString();
    const pickuptime = new Date(pickdate)?.toLocaleTimeString();

    const returnDate =
      dropdate !== "" ? new Date(dropdate).toLocaleDateString() : "";
    const returnTime =
      dropdate !== "" ? new Date(dropdate).toLocaleTimeString() : "";

    const leadCheck = await Lead.findOneAndDelete({
      $and: [{ customer_id: id }, { status: "pending" }],
    });

    const data = await Lead.create({
      pickup_address: pickup,
      drop_address: drop,
      pickup_date: pickupdate,
      pickup_time: pickuptime,
      return_pickup_address: returnPickup || "",
      return_drop_address: returnDrop || "",
      return_date: returnDate,
      return_time: returnTime,
      customer_id: id,
      otp: otp,
      status: "pending",
      trip_type: type,
      seater: seat,
    });

    return res.status(200).json({ msg: "Lead Generate Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

//Lead display for drivers
export const DisplayOrderLeads = async (req, res) => {
  try {
    const data = await Lead.find({ status: "pending" });
    return res.status(200).json({ msg: "Leads Fetch Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

// Lead Accept by Driver

export const AcceptOrderLead = async (req, res) => {
  try {
    const { price, id, driverId, driverName, model, rating, orders, phone } =
      req.body;

    const order = await Lead.findById({ _id: id }, "drivers");
    console.log(order);
    await order.drivers.push({
      id: driverId,
      name: driverName,
      price: price,
      model: model,
      rating: rating,
      orders: orders, // orders length
      phone: phone,
    });

    const data = await Lead.findByIdAndUpdate(
      { _id: id },
      { status: "pending", drivers: order.drivers }
    );

    return res
      .status(200)
      .json({ msg: "Order Accept by driver  Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const DisplayCustomerLead = async (req, res) => {
  try {
    const { id } = req.query;

    const data = await Lead.findOne({ customer_id: id });

    return res.status(200).json({ msg: "Lead Get Successfully", data });
  } catch (error) {
    console.log(error);
  }
};

export const DisplayRides = async (req, res) => {
  try {
    const { orderId } = req.query;
    const data = await Lead.findById({ _id: orderId }, "drivers");

    return res.status(200).json({ msg: "Drivers Fetch", data: data });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ msg: error });
  }
};

export const AcceptOrderLeadByCustomer = async (req, res) => {
  try {
    const { orderId, driverId, customerId, name } = req.body;
    const lead = await Lead.findOne({ _id: orderId });
    const driver = lead?.drivers?.find((f) => f?.id === driverId);

    if (!driver)
      return res.status(400).json({ msg: "Driver Not Found or Exist" });

    // Generate order for driver

    const driverOrder = await DriverOrder.create({
      customerId: customerId,
      customerName: name,
      distance1: lead?.pickup_address,
      distance2: lead?.drop_address,
      distance3: lead?.return_pickup_address,
      distance4: lead?.return_drop_address,
      date1: lead?.pickup_date + " | " + lead?.pickup_time,
      date2: lead?.return_date + " | " + lead?.return_time,
      price: driver?.price,
      driverId: driverId,
      status: "accept",
      paymentStatus: "pending",
      type: lead?.trip_type,
      otp: lead?.otp,
      carDetails: driver[0],
      seater: lead?.seater,
    });

    // Generate order for customer

    await CustomerOrder.create({
      customerId: customerId,
      distance1: lead?.pickup_address,
      distance2: lead?.drop_address,
      distance3: lead?.return_pickup_address,
      distance4: lead?.return_drop_address,
      date1: lead?.pickup_date + " | " + lead?.pickup_time,
      date2: lead?.return_date + " | " + lead?.return_time,
      price: driver?.price,
      status: "accept",
      paymentStatus: "pending",
      type: lead?.trip_type,
      otp: lead?.otp,
      driver: driver,
      driverOrderId: driverOrder?._id,
      seater: lead?.seater,
    });
    await Notification.create({
      title: "Ride Confirmation",
      driverId: driverId,
      message: `Your ride scheduled for ${lead?.pickup_date} has been successfully confirmed by the customer.`,
    });
    await Lead.findByIdAndDelete({ _id: orderId });
    const total = await DriverOrder.countDocuments({ _id: driverId });
    await Driver.findByIdAndUpdate({ _id: driverId }, { orders: total });

    return res
      .status(200)
      .json({ msg: "Order Accept by Customer Successfully", data: [] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const CancelRideByUser = async (req, res) => {
  try {
    const { id } = req.query;

    const data = await Lead.findByIdAndDelete({ _id: id });
    return res.status(200).json({ msg: "Order Delete Successfully", data: [] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export const CancelRideByUserAfterAccept = async (req, res) => {
  try {
    const { coi, doi } = req.query;

    const data = await CustomerOrder.findByIdAndUpdate(
      { _id: coi },
      { status: "cancel", paymentStatus: "unpaid" }
    );
    const data2 = await DriverOrder.findByIdAndUpdate(
      { _id: doi },
      { paymentStatus: "unpaid", status: "cancel" }
    );

    await Notification.create({
      title: "Ride Cancellation",
      driverId: data2?.driverId,
      message: `Your ride scheduled for ${data?.date1} has been cancelled by the customer.`,
    });

    return res.status(200).json({ msg: "Order Delete Successfully", data: [] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export const StartRide = async (req, res) => {
  try {
    const { id, otp } = req.query;

    const data = await DriverOrder.findById({ _id: id }, "otp customerId");
    const user = await User.findById({_id:data?.customerId},'accountOtp')

    if (user?.accountOtp !== String(otp)) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    await DriverOrder.findByIdAndUpdate({ _id: id }, { status: "start" });

    await CustomerOrder.findOneAndUpdate(
      { driverOrderId: id },
    { status: "Start" }
    );  

    return res.status(200).json({ msg: "Order Start Successfully",data:[] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};


export const FinishRide = async (req, res) => {
  try {
    const { id } = req.query;

    const data = await DriverOrder.findById({ _id: id }, "status");

    if (data?.status==="Start") {
      return res.status(400).json({ msg: "Something went wrong" });
    }

    await DriverOrder.findByIdAndUpdate({ _id: id }, { status: "complete" });

    await CustomerOrder.findOneAndUpdate(
      { driverOrderId: id },
      { status: "complete",paymentStatus:"complete" }
    );

    return res.status(200).json({ msg: "Order Start Successfully",data:[] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
