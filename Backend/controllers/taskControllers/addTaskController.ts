import type { Request, Response, NextFunction } from "express";
import addTaskUserInputValidate from "@/utils/addTaskUserInputValidate.js";
import { dbConnection } from "@/database/dbConnection.js";
import CustomError from "@/customError.js";
import { tasks } from "@/database/schema.js";

interface RequestBody {
  title: string;
  description: string;
  priority: "Low Priority" | "Medium Priority" | "High Priority";
  startingDate: Date;
  deadline: Date;
}

const addTaskController = async (
  req: Request<{}, {}, RequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.userId;
  const { title, description, priority, startingDate, deadline } = req.body;

  try {
    // Check if user input is valid.
    const isUserInputValid: boolean = addTaskUserInputValidate(
      userId,
      title,
      description,
      priority,
      startingDate,
      deadline,
    );

    if (!isUserInputValid)
      throw new CustomError("Missing Required Fields", 400);

    await dbConnection
      .insert(tasks)
      .values({ title, description, priority, userId, startingDate, deadline });

    // Sending appropriate response to Frontend.
    res.status(201).json({
      status: "success",
      message: "Task Added Successfully",
    });
  } catch (error) {
    console.error("Add Task Server Error");
    next(error);
  }
};

export default addTaskController;
