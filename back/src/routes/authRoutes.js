import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// Routes
router.post("/login", login);
router.post("/register", register);

export default router;