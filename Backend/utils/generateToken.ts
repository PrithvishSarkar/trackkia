import jwt from "jsonwebtoken";
import CustomError from "@/customError.js";

const generateToken = (id: number) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET;
  if (!JWT_SECRET_KEY) throw new CustomError("JWT Secret Key Unavailable", 500);

  const token = jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: "7d" });

  return token;
};

export default generateToken;