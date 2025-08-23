import { Request, Response } from "express";
import db from "../../connection.js";
import { users } from "../../drizzle_essentials/schema.js";
import { otps } from "../../drizzle_essentials/schema.js";
import { eq, sql } from "drizzle-orm";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const generateOTP = () => {
  const OTP: string = crypto.randomInt(1000, 9999).toString();
  return OTP;
};

const sendOTP = async (email: string, OTP: string, res: Response) => {
  // Create a Transporter with appropriate values.
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVER,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.APP_PASSWORD,
    },
  });
  // Sending Email to the User.
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "Trackkia Email Verification for Password Reset",
      text: `Your 4 digit OTP is ${OTP} which is valid only for 5 minutes.`,
    });
    res.status(200).json({
      status: "success",
      message: `OTP Sent. \nPlease check your email!`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failure", message: "Problem Sending OTP!" });
    return;
  }
};

const sendOtpController = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body;

  // Checking if the email is valid or not.
  if (!email.trim()) {
    res
      .status(400)
      .json({ status: "failure", message: "Email cannot be empty!" });
    return;
  }

  try {
    // Check if user exists using the email from Frontend.
    const userDataArray: { id: number }[] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase()));
    // If user not found, then send a warning.
    if (userDataArray.length === 0) {
      res.status(404).json({
        status: "failure",
        message: `User Not Found! \nPlease Register First!`,
      });
      return;
    }
    // If user found, then first generate OTP then send an email to the user.
    const { id: userId }: { id: number } = userDataArray[0];
    const OTP: string = generateOTP();
    sendOTP(email, OTP, res);

    // If OTP for the given user already exists, then send a warning.
    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(otps)
      .where(eq(otps.userId, userId));
    if (count > 0) {
      res.status(400).json({ status: "failure", message: "OTP already sent!" });
      return;
    }

    // Hash the generated OTP and store it in Database.
    const hashedOTP: string = await bcrypt.hash(OTP, 10);
    db.insert(otps).values({
      otp: hashedOTP,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      userId,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: `OTP Sending Error or Database Error!`,
    });
    return;
  }
};

export default sendOtpController;
