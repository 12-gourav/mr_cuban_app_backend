import { DriverOrder } from "../models/driverOrder.js";
import { Lead } from "../models/lead.js";
import { CustomerOrder } from "../models/order.js";

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
    } = req.body;

    const pickupdate = new Date(pickdate).toLocaleDateString();
    const pickuptime = new Date(pickdate)?.toLocaleTimeString();

    const returnDate =
      dropdate !== "" ? new Date(dropdate).toLocaleDateString() : "";
    const returnTime =
      dropdate !== "" ? new Date(dropdate).toLocaleString() : "";

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
    const { price, id, driverId, driverName, model, rating, orders } = req.body;

    const order = await Lead.findById({ _id: id }, "drivers");
    console.log(order);
    await order.drivers.push({
      id: driverId,
      name: driverName,
      price: price,
      model: model,
      rating: rating,
      orders: orders,
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

    const lead = await Lead.findById({ _id: orderId });
    const driver = lead?.drivers?.find((f) => f.id === driverId);

    // Generate order for driver

    await DriverOrder.create({
      customerId: customerId,
      customerName: name,
      distance1: lead?.pickup_address,
      distance2: lead?.drop_address,
      distance3: lead?.return_pickup_address,
      distance4: lead?.return_drop_address,
      date1: lead?.pickup_date + lead?.pickup_time,
      date2: lead?.return_date + lead?.return_time,
      price: driver.price,
      driverId: driverId,
      status: "accept",
      paymentStatus: "pending",
      type: lead?.trip_type,
      otp:lead?.otp,
    });

    // Generate order for customer

    await CustomerOrder.create({
      customerId: customerId,
      distance1: lead?.pickup_address,
      distance2: lead?.drop_address,
      distance3: lead?.return_pickup_address,
      distance4: lead?.return_drop_address,
      date1: lead?.pickup_date + lead?.pickup_time,
      date2: lead?.return_date + lead?.return_time,
      price: lead.price,
      status: "accept",
      paymentStatus: "pending",
      type: lead?.trip_type,
      otp:lead?.otp,
    });
    await Lead.findByIdAndDelete({ _id: orderId });
    return res
      .status(200)
      .json({ msg: "Order Accept by driver  Successfully", data });
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
