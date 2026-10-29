import type { Response, NextFunction } from "express";
import nodemailer from "nodemailer";

const sendOTP = async (
  email: string,
  OTP: string,
  res: Response,
  next: NextFunction,
  userId: number,
) => {
  // Creating Email Transporter
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Composing Message
  const message = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Trackkia Email Verification for Password Reset",
    text: `Your 4 digit OTP is ${OTP} which is valid only for only 5 minutes.`,
  };

  // Sending Email
  try {
    await transporter.sendMail(message);
    
    res.status(200).json({
      status: "success",
      message: `OTP Sent - Check Your Email`,
      userId,
    });
  } catch (error) {
    console.error("Sending Email Server Error");
    next(error);
  }
};

export default sendOTP;
