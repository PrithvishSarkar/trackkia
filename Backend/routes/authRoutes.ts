import express from "express";
import registerController from "../controllers/authControllers/registerController.js";
import loginController from "../controllers/authControllers/loginController.js";
import sendOtpController from "../controllers/authControllers/sendOtpController.js";
import verifyOtpController from "../controllers/authControllers/verifyOtpController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);

export default router;
