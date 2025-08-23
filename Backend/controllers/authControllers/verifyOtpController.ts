import { Request, Response } from "express";
import db from "../../connection.js";
import { otps } from "../../drizzle_essentials/schema.js";

const verifyOtpController = (req: Request, res: Response) => {
  const otp: string = req.body;
  
  // Check if the OTP is a valid string or not.
  if (!otp.trim()) {
    res.status(400).json({ status: "failure", message: "OTP cannot be empty!" });
    return;
  }

  // Compare the OTP sent by user and
};

export default verifyOtpController;