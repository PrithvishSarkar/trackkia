import type { Request, Response, NextFunction } from "express";
import { dbConnection } from "@/database/dbConnection.js";
import { users } from "@/database/schema.js";
import { eq } from "drizzle-orm";
import CustomError from "@/customError.js";

const userNameController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id: number = req.userId;

  try {
    const user = await dbConnection
      .select({ name: users.name })
      .from(users)
      .where(eq(users.id, id));
    const userName: string | undefined = user[0]?.name;
    if (!userName) throw new CustomError("Username Not Found", 404);

    // Sending appropriate response to Frontend.
    res.status(200).json({
      status: "success",
      message: "Username Found",
      userName,
    });
  } catch (error) {
    console.error("Username Fetching Server Error");
    next(error);
  }
};

export default userNameController;
