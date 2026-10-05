import type { Request, Response, NextFunction } from "express";
import CustomError from "@/customError.js";
import { dbConnection } from "@/database/dbConnection.js";
import { otps } from "@/database/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const verifyOtpController = async (
  req: Request<{}, {}, { otp: string; userId: number }>,
  res: Response,
  next: NextFunction,
) => {
  const { otp: userOtp, userId } = req.body;

  try {
    // Check if OTP and user ID is valid.
    if (!userOtp.trim() || !userId)
      throw new CustomError("Missing Required Data", 400);

    // Fetch OTP Information using user ID.
    const otpInfo = await dbConnection
      .select({ otp: otps.otp, otpExpiry: otps.otpExpiry })
      .from(otps)
      .where(eq(otps.userId, userId));
    if (!otpInfo.length || !otpInfo[0])
      throw new CustomError("OTP Information Not Found in DB", 404);

    const { otp, otpExpiry } = otpInfo[0];
    // Check if OTP is expired of not.
    if (otpExpiry < new Date())
      throw new CustomError("OTP Expired - Request New OTP", 410);

    // Verify OTP value.
    const isOtpCorrect: boolean = await bcrypt.compare(userOtp, otp);
    if (!isOtpCorrect) throw new CustomError("Incorrect OTP Value", 422);

    // Delete OTP from DB as the OTP is validated.
    await dbConnection.delete(otps).where(eq(otps.userId, userId));

    // Sending appropriate response to Frontend.
    res.status(200).json({
      status: "success",
      message: "OTP Verified Successfully",
      userId,
    });
  } catch (error) {
    console.error("Verifying OTP Server Error");
    next(error);
  }
};

export default verifyOtpController;
