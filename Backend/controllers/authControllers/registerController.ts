import type { NextFunction, Request, Response } from "express";
import CustomError from "@/customError.js";
import { dbConnection } from "@/database/dbConnection.js";
import { users } from "@/database/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const tokenName = "trackkia_token";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

const registerController = async (
  req: Request<{}, {}, RequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;

  try {
    // Check if user's input is valid or not.
    if (!name?.trim() || !email?.trim() || !password?.trim())
      throw new CustomError("Missing Required Fields", 400);

    // Check if user exists or not - DB will fetch the user if it exists.
    const user = await dbConnection
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase()));
    if (user.length > 0) throw new CustomError("User Already Exists", 409);

    // Hash the password then store the user in DB.
    const hashPassword: string = await bcrypt.hash(password, 10);
    const userCreated = await dbConnection
      .insert(users)
      .values({ name, email: email.toLowerCase(), password: hashPassword })
      .returning({id: users.id, name: users.name});

    const userDetails = userCreated[0];
    if (!userDetails)
      throw new CustomError("Problem Inserting User Details in DB", 500);

    // Generate and package JSON Web Token.
    const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET;
    if (!JWT_SECRET_KEY)
      throw new CustomError("JWT Secret Key Unavailable", 500);
    const token = jwt.sign({ id: userDetails.id }, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie(tokenName, token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    res.status(201).json({
      status: "success",
      message: "User Registered Successfully!",
      userName: userDetails.name, // This will be stored in Client Side Local Storage.
    });
  } catch (error) {
    console.error("Registration Server Error");
    next(error);
  }
};

export default registerController;
