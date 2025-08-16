import { Request, Response } from "express";
import db from "../../connection.js";
import { users } from "../../drizzle_essentials/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if credentials are valid or not.
  if (!email.trim() || !password.trim()) {
    res
      .status(400)
      .json({ status: "failure", message: "Credentials cannot be empty!!" });
    return;
  }

  // Check if user exists in Database or not.
  interface userInfoDataType {
    id: number;
    name: string;
    password: string;
  }
  const userInfoArray: userInfoDataType[] = await db
    .select({ id: users.id, name: users.name, password: users.password })
    .from(users)
    .where(eq(users.email, email));

  if (userInfoArray.length === 0) {
    res.status(400).json({ status: "failure", message: "User Not Found!" });
    return;
  }

  // When user is found, verify password.
  const isPasswordMatched: boolean = await bcrypt.compare(
    password,
    userInfoArray[0].password
  );
  if (!isPasswordMatched) {
    res.status(401).json({ status: "failure", message: "Incorrect Password!" });
    return;
  }

  // If password matches, generate and packing it in a Cookie.
  const JWT_SECRET: string = process.env.JWT_SECRET || "";
  if (!JWT_SECRET) {
    res.status(500).json({
      status: "failure",
      message: "JWT secret key not found in Environment Variables!",
    });
    return;
  }
  const token: string = jwt.sign({ id: userInfoArray[0].id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("trackkia_token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  // Sending appropriate response to Frontend.
  res
    .status(200)
    .json({
      status: "success",
      message: "User Logged In Successfully!",
      userName: userInfoArray[0].name, // This will be stored in Client Side Local Storage.
    });
};

export default loginController;
