import { Rides } from "../models/rides.js";
import cloudinary from "cloudinary";

export const addRide = async (req, res) => {
  try {
    const { id, name, no, seat } = req.body;
    const { images } = req.files;

    const check = await Rides.find({
      $and: [{ driverId: id }, { modelNumber: no }],
    });

    if (check?.length > 0) {
      return res.status(400).json({ msg: "Vichele already register" });
    }

    let imageUrls = [];

    // Upload images to Cloudinary
    if (images) {
      const uploadImages = Array.isArray(images) ? images : [images]; // Handle multiple images

      for (let i = 0; i < uploadImages.length; i++) {
        const image = uploadImages[i];

        const result = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: "rides", // Specify a folder in Cloudinary
        });

        imageUrls.push({
          url: result.secure_url,
          public_id: result?.public_id,
        }); // Store uploaded image URLs
      }
    }

    const data = await Rides.create({
      driverId: id,
      modelName: name,
      modelNumber: no,
      seat: seat,
      img:imageUrls
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


export const GetActiveRides = async (req, res) => {
  try {
    const { id } = req.query;

    const data = await Rides.find({ $and:[{driverId: id},{status:true}] });

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
