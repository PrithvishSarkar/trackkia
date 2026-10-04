import type { Request, Response, NextFunction } from "express";
import { generateOTP, hashOTP } from "@/utils/otpGenerateAndHash.js";
import sendOTP from "@/utils/sendOtpOnEmail.js";
import { dbConnection } from "@/database/dbConnection.js";
import { users, otps } from "@/database/schema.js";
import { eq } from "drizzle-orm";

const resentOtpController = async (
  req: Request<{}, {}, { email: string; userId: number }>,
  res: Response,
  next: NextFunction,
) => {
  const { email, userId } = req.body;

  /*
  No need to check for valid email or verify user authenticity as it's already done
  by '/send-otp' API endpoint. User can only ask for a resend if the OTP is already sent,
  i.e., the user has tapped in '/send-otp' API endpoint before 'resend-otp' API endpoint.
  The 'email' UI will be locked once the user clicks on 'Send OTP' button in Frontend,
  therefore, the user cannot modify the email when asking to resend OTP.
  */

  // Generate and hash OTP value.
  const OTP = generateOTP();
  const hashedOTP = await hashOTP(OTP);

  // Update the OTP and expiry date in DB.
  try {
    await dbConnection
      .update(otps)
      .set({ otp: hashedOTP, otpExpiry: new Date(Date.now() + 5 * 60 * 1000) })
      .where(eq(users.id, userId));

    // Resend OTP via email.
    sendOTP(email, OTP, res, next, userId);
  } catch (error) {
    console.error("Resend OTP Server Error");
    next(error);
  }
};

export default resentOtpController;
