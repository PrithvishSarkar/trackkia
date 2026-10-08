import type { Request, Response, NextFunction } from "express";
import type { RequestBody as Status } from "@/controllers/taskControllers/editStatusController.js";
import addTaskUserInputValidate from "@/utils/addOrEditInputValidate.js";
import { dbConnection } from "@/database/dbConnection.js";
import CustomError from "@/customError.js";
import { tasks } from "@/database/schema.js";

export type Priority = "Low Priority" | "Medium Priority" | "High Priority";

interface RequestBody {
  title: string;
  description: string;
  priority: Priority;
  startingDate: Date;
  deadline: Date;
}

interface AddedTaskDetails extends RequestBody {
  id: number;
  status: Status;
}

const requiredFields = {
  id: tasks.id,
  title: tasks.title,
  description: tasks.description,
  priority: tasks.priority,
  status: tasks.status,
  startingDate: tasks.startingDate,
  deadline: tasks.deadline,
};

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

    const newTaskArray: AddedTaskDetails[] = await dbConnection
      .insert(tasks)
      .values({ title, description, priority, userId, startingDate, deadline })
      .returning(requiredFields);
    const newTaskDetails: AddedTaskDetails | undefined = newTaskArray[0];
    if (!newTaskDetails)
      throw new CustomError("Added Task Details Not Fetched", 500);

    // Sending appropriate response to Frontend.
    res.status(201).json({
      status: "success",
      message: "Task Added Successfully",
      newTask: newTaskDetails,
    });
  } catch (error) {
    console.error("Add Task Server Error");
    next(error);
  }
};

export default addTaskController;
