import { Request, Response } from "express";
import db from "../../connection.js";
import { otps } from "../../drizzle_essentials/schema.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

const verifyOtpController = async (req: Request, res: Response) => {
  const { otp: userOTP, userId }: { otp: string; userId: number } = req.body;

  // Check if the OTP and User ID is a valid string or not.
  if (!userOTP.trim() || !userId) {
    res
      .status(400)
      .json({ status: "failure", message: "OTP cannot be empty!" });
    return;
  }

  try {
    // Fetching OTP data using 'userId'.
    const otpInfoArray = await db
      .select({ otp: otps.otp, otpExpiry: otps.otpExpiry })
      .from(otps)
      .where(eq(otps.userId, userId));
    if (otpInfoArray.length === 0) {
      res.status(404).json({
        status: "failure",
        message: "User Not Found or OTP Already Verified!",
      });
      return;
    }
    const { otp, otpExpiry } = otpInfoArray[0];
    // Checking if OTP is expired or not.
    if (otpExpiry < new Date()) {
      res.status(403).json({
        status: "failure",
        message: "OTP has expired. Please resend OTP!",
      });
      return;
    }

    // Verify OTP send via Frontend.
    const isOtpMatched: boolean = await bcrypt.compare(userOTP, otp);
    if (!isOtpMatched) {
      res.status(401).json({
        status: "failure",
        message: `Incorrect OTP! \n Please provide a valid OTP!`,
      });
      return;
    }

    // Deleting OTP from Database as it's verified successfully.
    await db.delete(otps).where(eq(otps.userId, userId));

    // Sending appropriate response to Frontend.
    res
      .status(200)
      .json({ status: "success", message: "OTP Verified Successfully!" });
  } catch (err: any) {
    console.error("OTP Verification Error: ", err.message);
    res.status(500).json({
      status: "failure",
      message: `Problem Verifying OTP! \nPlease try again later.`,
    });
  }
};

export default verifyOtpController;
