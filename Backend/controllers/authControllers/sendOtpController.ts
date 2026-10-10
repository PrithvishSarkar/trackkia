import type { Request, Response, NextFunction } from "express";
import CustomError from "@/customError.js";
import { dbConnection } from "@/database/dbConnection.js";
import { otps, users } from "@/database/schema.js";
import { eq } from "drizzle-orm";
import { generateOTP, hashOTP } from "@/utils/otpGenerateAndHash.js";
import sendOTP from "@/utils/sendOtpOnEmail.js";

const sendOtpController = async (
  req: Request<{}, {}, { email: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  try {
    // Checking if email is valid or not.
    if (!email.trim()) throw new CustomError("Email Field Empty", 400);

    // Check if user exists in DB.
    const user = await dbConnection
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));
    const userId: number | undefined = user[0]?.id;
    if (!userId) throw new CustomError("User Not Found", 404);

    // Generate and hash OTP then upsert it in DB.
    const OTP: string = generateOTP();
    const hashedOTP: string = await hashOTP(OTP);
    await dbConnection
      .insert(otps)
      .values({
        otp: hashedOTP,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
        userId,
      })
      .onConflictDoUpdate({
        target: otps.userId,
        set: {
          otp: hashedOTP,
          otpExpiry: new Date(Date.now() + 5 * 60 + 1000),
        },
      });
    
    // Sending OTP via email.
    // The 'Send OTP' button in Frontend freezes once the OTP is sent.
    await sendOTP(email, OTP, res, next, userId);
  } catch (error) {
    console.error("Sending OTP Server Error");
    next(error);
  }
};

export default sendOtpController;
