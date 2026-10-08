import type { Request, Response, NextFunction } from "express";
import { dbConnection } from "@/database/dbConnection.js";
import { tasks } from "@/database/schema.js";
import { and, eq } from "drizzle-orm";
import CustomError from "@/customError.js";

export type RequestBody = "Pending" | "In Progress" | "Completed";
interface TaskDetails {
  id: number;
  status: RequestBody;
}

const editStatusController = async (
  req: Request<{ id: string }, {}, RequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const userId: number = req.userId;
  const taskId: number = parseInt(req.params.id);
  const taskStatus = req.body;

  try {
    const editedTaskArray: TaskDetails[] = await dbConnection
      .update(tasks)
      .set({ status: taskStatus })
      .where(and(eq(tasks.userId, userId), eq(tasks.id, taskId)))
      .returning({ id: tasks.id, status: tasks.status });
    const editedTaskDetails: TaskDetails | undefined = editedTaskArray[0];
    if (!editedTaskDetails)
      throw new CustomError("Problem Editing Status - Try Editing Again", 500);

    // Sending appropriate response to Frontend.
    res.status(200).json({
      status: "success",
      message: "Task Status Updated Successfully",
      updatedTask: editedTaskDetails,
    });
  } catch (error) {
    console.error("Task Status Updation Server Error");
    next(error);
  }
};

export default editStatusController;
