import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { tokenName } from "@/utils/packageToken.js";
import CustomError from "@/customError.js";

export const protectedRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string = req.cookies[tokenName];

  // If token not found.
  if (!token) throw new CustomError("Unauthenticated User", 401);

  // If token found but does not matches secret key.
  try {
    const JWT_SECRET_KEY: string = process.env.JWT_SECRET || "";
    if (!JWT_SECRET_KEY) {
      throw new CustomError(
        "JWT Secret Key Not Found in Environment Variable",
        500,
      );
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Token Verification Server Error");
    next(error);
  }
};
