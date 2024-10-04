import express from "express";
import { AccountVerify, FetchDrivers, FetchUsers, LoginAPI } from "../controllers/admin_controller.js";


const router = express.Router();


router.get("/admin/driver",FetchDrivers);
router.get("/admin/driver/update",AccountVerify);

router.get("/admin/users",FetchUsers);

router.get("/admin/login",LoginAPI);



export default router