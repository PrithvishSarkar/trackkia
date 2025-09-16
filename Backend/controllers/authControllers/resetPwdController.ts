import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../../connection.js";
import { users } from "../../drizzle_essentials/schema.js";
import { eq } from "drizzle-orm";

const resetPasswordController = async (req: Request, res: Response) => {
  interface requestBodyType {
    email: string;
    password: string;
    confirmPassword: string;
  }
  const { email, password, confirmPassword }: requestBodyType = req.body;

  // Check if the password and confirm password is valid or not.
  if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
    res
      .status(400)
      .json({ status: "failure", message: "Credentials cannot be empty!" });
    return;
  }

  /*
  NOTE:
  User existence is already verified by `/send-otp` and `/verify-otp` endpoints.
  This endpoint will only be accessible if `/verify-otp` endpoint is passed.
  */

  // Verify if both password and confirm password are same or not.
  if (password !== confirmPassword) {
    res.status(400).json({
      status: "failure",
      message: `"Confirm Password" is not the same as "Password"!`,
    });
    return;
  }

  // Hash the given password using Bcrypt.
  const hashedPassword: string = await bcrypt.hash(password, 10);

  // Updating 'password' in Database.
  try {
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, email));

    // Sending appropriate response to Frontend.
    res.status(200).json({
      status: "success",
      message: "Password Reset Successfully!",
    });
  } catch (err: any) {
    console.error("Password Reset Error: ", err.message);
    res
      .status(500)
      .json({ status: "failure", message: "Problem Resetting Password!" });
    return;
  }
};

export default resetPasswordController;
