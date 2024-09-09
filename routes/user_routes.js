import express from "express";
import {
  LoadUser,
  User_Login,
  User_Register,
  User_Update,
} from "../controllers/auth_controller.js";
import { UserCheck } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register/user", User_Register);
router.post("/login/user", User_Login);
router.get("/load/user",UserCheck, LoadUser);
router.post("/update/user", User_Update);

export default router;
