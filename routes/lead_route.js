import express from "express";
import {
  AcceptOrderLead,
  AcceptOrderLeadByCustomer,
  CancelRideByUser,
  CreateLead,
  DisplayCustomerLead,
  DisplayOrderLeads,
} from "../controllers/lead_controller.js";

const router = express.Router();

router.post("/create/lead", CreateLead);
router.get("/leads", DisplayOrderLeads);
router.post("/accept/lead/driver", AcceptOrderLead);
router.post("/accept/lead/customer", AcceptOrderLeadByCustomer);
router.get("/cancel/lead/customer", CancelRideByUser);
router.get("/get/lead", DisplayCustomerLead);

export default router;
