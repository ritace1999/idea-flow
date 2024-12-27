import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getProfile);
router.route("/edit").post(protect, updateProfile);

export default router;
