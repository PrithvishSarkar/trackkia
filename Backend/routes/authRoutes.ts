import express from "express";
import userNameController from "../controllers/authControllers/userNameController.js";
import registerController from "../controllers/authControllers/registerController.js";
import loginController from "../controllers/authControllers/loginController.js";
import sendOtpController from "../controllers/authControllers/sendOtpController.js";
import resendOtpController from "../controllers/authControllers/resendOtpController.js";
import verifyOtpController from "../controllers/authControllers/verifyOtpController.js";
import resetPwdController from "../controllers/authControllers/resetPwdController.js";
import logoutController from "../controllers/authControllers/logoutController.js";
import { protectedRouteMiddleware } from "../middleware.js";

const router = express.Router();

router.get("/user-name", protectedRouteMiddleware, userNameController);
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.patch("/resend-otp", resendOtpController);
router.post("/reset-password", resetPwdController);
router.post("/logout", logoutController);

export default router;
