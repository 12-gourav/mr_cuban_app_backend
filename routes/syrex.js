import express from "express";
import { countdocs, userDisable } from "../controllers/syrex.js";

const router = express.Router();

router.get("/server/syrex/counts", countdocs);

export default router;