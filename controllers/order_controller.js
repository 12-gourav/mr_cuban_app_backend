import { DriverOrder } from "../models/driverOrder.js";
import { CustomerOrder } from "../models/order.js";

export const customerUpcommingOrder = async (req, res) => {
  try {
    const { page, id, limit } = req.query;

    const pageNo = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNo - 1) * pageSize;

    const total = await CustomerOrder.countDocuments({
      $and: [{ customerId: id }, { status: "accept" }],
    });

    const data = await CustomerOrder.find({
      $and: [{ customerId: id }, { status: "accept" }],
    })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ msg: "Order Fetch Successfully", data, total });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export const customerHistoryOrder = async (req, res) => {
  try {
    const { page, id, limit } = req.query;

    const pageNo = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNo - 1) * pageSize;

    const total = await CustomerOrder.countDocuments({
      $and: [
        { customerId: id },
        {
          $or: [{ status: "cancel" }, { status: "complete" }],
        },
      ],
    });

    const data = await CustomerOrder.find({
      $and: [
        { customerId: id },
        {
          $or: [{ status: "cancel" }, { status: "complete" }],
        },
      ],
    })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ msg: "Order Fetch Successfully", data, total });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};





export const DriverUpcommingOrder = async (req, res) => {
  try {
    const { page, id, limit } = req.query;

    const pageNo = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNo - 1) * pageSize;

    const total = await DriverOrder.countDocuments({
      $and: [{ driverId: id }, { status: "accept" }],
    });

    const data = await DriverOrder.find({
      $and: [{ driverId: id }, { status: "accept" }],
    })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ msg: "Order Fetch Successfully", data, total });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export const DriverHistoryOrder = async (req, res) => {
  try {
    const { page, id, limit } = req.query;

    const pageNo = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNo - 1) * pageSize;

    const total = await DriverOrder.countDocuments({
      $and: [
        { customerId: id },
        {
          $or: [{ status: "cancel" }, { status: "complete" }],
        },
      ],
    });

    const data = await DriverOrder.find({
      $and: [
        { customerId: id },
        {
          $or: [{ status: "cancel" }, { status: "complete" }],
        },
      ],
    })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ msg: "Order Fetch Successfully", data, total });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};