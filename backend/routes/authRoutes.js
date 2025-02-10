import express from "express";
import { forgotPassword, resetPassword } from "../controllers/passwordcontrollers.js";
import { loginUser, registerUser } from "../controllers/authcontroller.js";

const router = express.Router();
router.post("/signup",registerUser);
router.post("/login",loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
