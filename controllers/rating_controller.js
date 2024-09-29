import { Driver } from "../models/driver.js";
import { Rating } from "../models/rating.js";

//comment create by user
export const createComment = async (req, res) => {
  try {
    const { driverId, customerId, comment, rating } = req.query;

    const data = await Rating.create({
      driverId: driverId,
      customerId: customerId,
      comment: comment,
      rating: rating,
    });

    const rateNumber = await Rating.find({ driverId: driverId }, "rating");
    let temp = 0;
    for (let i = 0; i < rateNumber?.length; i++) {
      temp = temp + Number(rateNumber[i]?.rating);
    }
    const finalRating = Math.floor(Number(temp / rateNumber?.length)).toFixed(
      0
    );

    await Driver.findByIdAndUpdate({ _id: driverId }, { ratings: finalRating });
    return res.status(201).json({ msg: "Rating Saved Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

//comments get by user
export const CommentGetByCustomer = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await Rating.find({ customerId: id })
      .limit(30)
      .sort({ createdAt: -1 });

    return res.status(200).json({ msg: "Comments Fetch Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};


//comments get by driver
export const CommentGetByDriver = async (req, res) => {
    try {
      const { id } = req.query;
      const data = await Rating.find({ driverId: id })
        .limit(30)
        .sort({ createdAt: -1 });
  
      return res.status(200).json({ msg: "Comments fetch Successfully", data });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error });
    }
  };

