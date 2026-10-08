import type { Request, Response, NextFunction } from "express";
import { dbConnection } from "@/database/dbConnection.js";
import { tasks } from "@/database/schema.js";
import { eq, and } from "drizzle-orm";
import CustomError from "@/customError.js";
import addOrEditInputValidate from "@/utils/addOrEditInputValidate.js";

interface RequestBody {
  title: string;
  description: string;
  priority: "Low Priority" | "Medium Priority" | "High Priority";
  startingDate: Date;
  deadline: Date;
}

interface EditedTaskDetails extends RequestBody {
  id: number;
}

const editTaskController = async (
  req: Request<{ id: string }, {}, RequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const userId: number = req.userId;
  const taskId: number = parseInt(req.params.id);
  const { title, description, priority, startingDate, deadline } = req.body;

  try {
    // Check if user input is valid.
    const isUserInputValid: boolean = addOrEditInputValidate(
      userId,
      title,
      description,
      priority,
      startingDate,
      deadline,
    );
    if (!isUserInputValid)
      throw new CustomError("Missing Required Fields", 400);

    // Update DB field values.
    const editedTaskArray: EditedTaskDetails[] = await dbConnection
      .update(tasks)
      .set({ title, description, priority, startingDate, deadline })
      .where(and(eq(tasks.userId, userId), eq(tasks.id, taskId)))
      .returning({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        priority: tasks.priority,
        startingDate: tasks.startingDate,
        deadline: tasks.deadline,
      });
    const editedTask: EditedTaskDetails | undefined = editedTaskArray[0];
    if (!editedTask)
      throw new CustomError("Problem Editing Task - Try Editing Again", 500);

    // Sending appropriate response to Frontend.
    res.status(200).json({
      status: "success",
      message: "Task Updated Successfully",
      updatedTask: editedTask,
    });
  } catch (error) {
    console.error("Task Editing Server Error");
    next(error);
  }
};

export default editTaskController;
