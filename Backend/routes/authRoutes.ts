import express from "express";
import registerController from "../controllers/authControllers/registerController.js";
import loginController from "../controllers/authControllers/loginController.js";
import sendOtpController from "../controllers/authControllers/sendOtpController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/send-otp", sendOtpController);

export default router;
