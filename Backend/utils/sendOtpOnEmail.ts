import type { NextFunction, Response } from "express";
import nodemailer from "nodemailer";

const sendOTP = async (
  email: string,
  OTP: string,
  res: Response,
  next: NextFunction,
  userId: number,
) => {
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
      text: `Your 4 digit OTP is ${OTP} which is valid only for only 5 minutes.`,
    });

    res.status(200).json({
      status: "success",
      message: `OTP Sent - Check Your Email`,
      userId,
    });
  } catch (error) {
    console.error("OTP Resend Server Error");
    next(error);
  }
};

export default sendOTP;
