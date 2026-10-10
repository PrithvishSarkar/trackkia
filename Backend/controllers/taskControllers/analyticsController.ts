import type { Request, Response, NextFunction } from "express";
import type { Priority } from "./addTaskController.js";
import type { RequestBody as Status } from "@/controllers/taskControllers/editStatusController.js";
import { dbConnection } from "@/database/dbConnection.js";
import { tasks } from "@/database/schema.js";
import { count, eq } from "drizzle-orm";
import CustomError from "@/customError.js";

interface PriorityAnalytics {
  priority: Priority;
  count: number;
}

interface StatusAnalytics {
  status: Status;
  count: number;
}

const analyticsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId: number = req.userId;

  try {
    // Calculate the total number of tasks listed by the user.
    const totalTasks: number = await dbConnection.$count(
      tasks,
      eq(tasks.userId, userId),
    );
    if (totalTasks === 0)
      throw new CustomError("Tasks Not Available - Try Adding Tasks", 404);

    // Counting tasks priority-wise.
    const priorityAnalytics: PriorityAnalytics[] = await dbConnection
      .select({ priority: tasks.priority, count: count(tasks.id) })
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .groupBy(tasks.priority);

    // Counting tasks status-wise.
    const statusAnalytics: StatusAnalytics[] = await dbConnection
      .select({ status: tasks.status, count: count(tasks.id) })
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .groupBy(tasks.status);

    // Sending appropriate response to Frontend.
    res.status(200).json({
      status: "success",
      message: "Analytics Data Fetched Successfully",
      priorityAnalytics,
      statusAnalytics,
      totalTasks,
    });
  } catch (error) {
    console.error("Task Analytics Fetching Server Error");
    next(error);
  }
};

export default analyticsController;
