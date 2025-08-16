import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// Extend Express Request interface to include 'user'.
declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

const protectedRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies["trackkia_token"];

  // If token not found.
  if (!token) {
    res.status(401).json({ status: "failure", message: "Unauthorized User!" });
    return;
  }

  // If token found but does not matches secret key.
  try {
    const JWT_SECRET: string = process.env.JWT_SECRET || "";
    if (!JWT_SECRET) {
      res.status(500).json({
        status: "failure",
        message: "JWT secret key not found in Environment Variable!",
      });
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({
      status: "failure",
      message: "Invalid or expired token",
    });
    console.error("Token Verification Error: ", err.message);
  }
};

export default protectedRouteMiddleware;
