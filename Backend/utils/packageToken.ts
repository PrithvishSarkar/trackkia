import type { Response } from "express";
import generateToken from "./generateToken.js";

export const tokenName = "trackkia_token";

const packageToken = (id: number, res: Response) => {
  const token = generateToken(id);
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie(tokenName, token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
};

export default packageToken;