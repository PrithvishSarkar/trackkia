import type { Request, Response, NextFunction } from "express";
import CustomError from "@/customError.js";
import { dbConnection } from "@/database/dbConnection.js";
import { users } from "@/database/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import packageToken from "@/utils/packageToken.js";

interface RequestBody {
  email: string;
  password: string;
}

interface UserDetails {
  id: number;
  name: string;
  password: string;
}

const loginController = async (
  req: Request<{}, {}, RequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    // Check if user input is valid or not.
    if (!email.trim() || !password.trim())
      throw new CustomError("Missing Required Fields", 400);

    // Verify user email.
    const user: UserDetails[] = await dbConnection
      .select({ id: users.id, name: users.name, password: users.password })
      .from(users)
      .where(eq(users.email, email.toLocaleLowerCase()));
    const userDetails: UserDetails | undefined = user[0];
    if (!userDetails) throw new CustomError("User Not Found", 401);

    // Verify user password.
    const isPasswordCorrect: boolean = await bcrypt.compare(
      password,
      userDetails.password,
    );
    if (!isPasswordCorrect) throw new CustomError("Unauthenticated User", 401);

    // Generate and package JSON Web Token.
    packageToken(userDetails.id, res);

    // Sending appropriate response to Frontend.
    res.status(200).json({
      status: "success",
      message: "User Logged In Successfully",
      userName: userDetails.name, // This will be stored in Client Side Local Storage.
    });
  } catch (error) {
    console.error("Login Server Error");
    next(error);
  }
};

export default loginController;
