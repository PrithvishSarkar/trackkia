import type { Request, Response, NextFunction } from "express";
import CustomError from "@/customError.js";
import { dbConnection } from "@/database/dbConnection.js";
import { users } from "@/database/schema.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

interface RequestBody {
  userId: number;
  password: string;
  confirmPassword: string;
}

const resetPasswordController = async (
  req: Request<{}, {}, RequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const { userId, password, confirmPassword } = req.body;

  try {
    // Check if user inputs are valid.
    if (!userId || !password.trim() || !confirmPassword.trim())
      throw new CustomError("Missing Required Fields", 400);

    /*
    NOTE:
    User existence is already verified by `/send-otp` and `/verify-otp` endpoints.
    This endpoint will only be accessible if `/verify-otp` endpoint is passed.
    */

    // Check if password and confirm password are same.
    if (password !== confirmPassword)
      throw new CustomError("Password Don't Match", 400);

    // Hash the password and update in DB.
    const hashPassword: string = await bcrypt.hash(password, 10);
    await dbConnection
      .update(users)
      .set({ password: hashPassword })
      .where(eq(users.id, userId));

    // Sending appropriate response to Frontend.
    res.status(200).json({
      status: "success",
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.error("Resetting Password Server Error");
    next(error);
  }
};

export default resetPasswordController;
