import express from "express";
import { addRide, GetRides, RidesDelete } from "../controllers/rides_controller.js";

const router = express.Router();


router.post("/create/ride", addRide);
router.get("/get/ride",GetRides);
router.get("/delete/ride",RidesDelete);



export default router;
