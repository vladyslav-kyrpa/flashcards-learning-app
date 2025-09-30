import express from "express";
import { deleteProfile, getCurrent, getProfile, updateProfile } from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/", getCurrent);
router.get("/:id", getProfile);
router.post("/update", updateProfile);
router.post("/delete/:id", deleteProfile)

export default router;