import type { Request, Response } from "express";
import { tokenName } from "@/utils/packageToken.js";

const logoutController = async (req: Request, res: Response) => {
  const isProduction: boolean = process.env.NODE_ENV === "production";
  res.clearCookie(tokenName, {
    maxAge: 0,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res
    .status(200)
    .json({ status: "success", message: "Logged Out Successfully!" });
};

export default logoutController;
