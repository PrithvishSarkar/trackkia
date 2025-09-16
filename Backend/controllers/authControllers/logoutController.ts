import type { Request, Response } from "express";

const logoutController = async (req: Request, res: Response) => {
  res.clearCookie("trackkia_token", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res
    .status(200)
    .json({ status: "success", message: "Logged Out Successfully!" });
};

export default logoutController;
