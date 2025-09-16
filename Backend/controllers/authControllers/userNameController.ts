import type { Request, Response } from "express";
import db from "../../connection.js";
import { users } from "../../drizzle_essentials/schema.js";
import { eq } from "drizzle-orm";

// Extend Express Request interface to include 'user'.
declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

const userNameController = async (req: Request, res: Response) => {
  const id: number = req.userId;
  try {
    const userNameArray: { name: string }[] = await db
      .select({ name: users.name })
      .from(users)
      .where(eq(users.id, id));
    if (userNameArray.length === 0 || !userNameArray[0]) return;

    res.status(200).json({
      status: "success",
      message: "User Name Found Successfully!",
      userName: userNameArray[0].name,
    });
  } catch (err: any) {
    console.error(err.message);
    res
      .status(500)
      .json({ status: "failure", message: "Problem Fetching User Details!" });
  }
};

export default userNameController;
