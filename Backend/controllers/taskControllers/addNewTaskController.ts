import { Request, Response } from "express";
import db from "../../connection.js";
import { tasks } from "../../drizzle_essentials/schema.js";

// Extend Express Request interface to include 'user'.
declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

const addNewTaskController = async (req: Request, res: Response) => {
  const userId = req.userId;

  interface RequestBodyType {
    title: string;
    description: string;
    priority: "Low Priority" | "Medium Priority" | "High Priority";
    startingDate: string;
    deadline: string;
  }

  const {
    title,
    description,
    priority,
    startingDate,
    deadline,
  }: RequestBodyType = req.body;

  // Check if all values are valid.
  if (
    !userId ||
    !title.trim() ||
    !description.trim() ||
    !priority.trim() ||
    !startingDate.trim() ||
    !deadline.trim()
  ) {
    res
      .status(400)
      .json({ status: "failure", message: "Credentials cannot be empty!" });
    return;
  }

  // Add to Database.
  try {
    await db.insert(tasks).values({
      title,
      description,
      priority,
      userId,
      startingDate: new Date(startingDate),
      deadline: new Date(deadline),
    });
    res
      .status(201)
      .json({ status: "success", message: "Task Added Successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failure", message: "Problem Inserting Task!" });
  }
};

export default addNewTaskController;
