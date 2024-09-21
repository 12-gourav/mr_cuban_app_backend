

import express from "express";
import { customerHistoryOrder, customerUpcommingOrder } from "../controllers/order_controller.js";

const router = express.Router();


router.get("/get/customer/upcoming/order",customerUpcommingOrder);
router.get("/get/customer/history/order",customerHistoryOrder);




export default router;


