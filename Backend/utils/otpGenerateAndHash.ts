import crypto from "crypto";
import bcrypt from "bcryptjs";

export const generateOTP = () => {
  const OTP: string = crypto.randomInt(1000, 9999).toString();
  return OTP;
};

export const hashOTP = async (otp: string) => {
  const hashedOtp: string = await bcrypt.hash(otp, 10);
  return hashedOtp;
}