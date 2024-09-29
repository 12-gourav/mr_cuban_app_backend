import { Rides } from "../models/rides.js";

export const addRide = async (req, res) => {
  try {
    const { id, name, no, seat } = req.query;

    const check = await Rides.find({
      $and: [{ driverId: id }, { modelNumber: no }],
    });

    if (check?.length > 0) {
      return res.status(400).json({ msg: "Vichele already register" });
    }

    const data = await Rides.create({
      driverId: id,
      modelName: name,
      modelNumber: no,
      seat: seat,
    });

    return res.status(201).json({ msg: "Vichele Register Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const GetRides = async (req, res) => {
  try {
    const { id } = req.query;

    const data = await Rides.find({ driverId: id });

    return res.status(200).json({ msg: "Rides Get Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export const RidesDelete = async (req, res) => {
  try {
    const { id } = req.query;

    const data = await Rides.findByIdAndDelete({ _id: id });

    return res.status(200).json({ msg: "Rides Delete Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(400), json({ msg: error });
  }
};
