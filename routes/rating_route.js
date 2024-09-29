import express from "express";
import {
  CommentGetByCustomer,
  CommentGetByDriver,
  createComment,
} from "../controllers/rating_controller.js";

const router = express.Router();

router.get("/create/comment", createComment);
router.get("/get/comment/by/user", CommentGetByCustomer);
router.get("/get/comment/by/driver", CommentGetByDriver);

export default router;
