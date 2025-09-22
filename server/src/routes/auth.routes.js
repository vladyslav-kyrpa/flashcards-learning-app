import express from "express"; 
import { check, login, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/check", check);
router.post("/log-in", login);
router.post("/register", register);

export default router;