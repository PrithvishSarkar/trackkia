import type { Request, Response, NextFunction } from "express";
import { dbConnection } from "@/database/dbConnection.js";
import { tasks } from "@/database/schema.js";
import { and, eq } from "drizzle-orm";
import CustomError from "@/customError.js";

const deleteTaskController = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const userId: number = req.userId;
  const taskId: number = parseInt(req.query.id);

  try {
    const deletedTask = await dbConnection
      .delete(tasks)
      .where(and(eq(tasks.userId, userId), eq(tasks.id, taskId)))
      .returning({ id: tasks.id });

    const id: number | undefined = deletedTask[0]?.id;
    if (!id)
      throw new CustomError("Problem Deleting Task - Try Deleting Again", 500);

    // Sending appropriate response to Frontend.
    res.status(200).json({
      status: "success",
      message: "Task Deleted Successfully",
      taskId: id,
    });
  } catch (error) {
    console.error("Task Deletion Server Error");
    next(error);
  }
};

export default deleteTaskController;
