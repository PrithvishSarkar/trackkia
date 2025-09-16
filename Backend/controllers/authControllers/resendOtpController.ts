import type { Request, Response } from "express";
import { sendOTP, generateOTP } from "./sendOtpController.js";
import db from "../../connection.js";
import { otps } from "../../drizzle_essentials/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const resendOtpController = async (req: Request, res: Response) => {
  const { email, userId }: { email: string; userId: number } = req.body;

  /*
  No need to check for valid email or verify user authenticity as it's already done
  by '/send-otp' API endpoint. User can only ask for a resend if the OTP is already sent,
  i.e., the user has tapped in '/send-otp' API endpoint before 'resend-otp' API endpoint.
  The 'email' UI will be locked once the user clicks on 'Send OTP' button in Frontend,
  therefore, the user cannot modify the email when asking to resend OTP.
  */

  // Generate OTP using imported function.
  const OTP: string = generateOTP();

  // Hash the OTP before updating it on Database.
  const hashedOTP = await bcrypt.hash(OTP, 10);

  // Update the OTP and Expiry values in Database.
  try {
    await db
      .update(otps)
      .set({ otp: hashedOTP, otpExpiry: new Date(Date.now() + 5 * 60 * 1000) })
      .where(eq(otps.userId, userId));
    sendOTP(email, OTP, res, userId);
  } catch (err: any) {
    res
      .status(500)
      .json({ status: "failure", message: "Database Updation Failure!" });
  }
};

export default resendOtpController;
