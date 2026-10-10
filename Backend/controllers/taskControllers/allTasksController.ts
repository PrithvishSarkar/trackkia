import type { Request, Response, NextFunction } from "express";
import { dbConnection } from "@/database/dbConnection.js";
import { tasks } from "@/database/schema.js";
import { eq, desc } from "drizzle-orm";
import CustomError from "@/customError.js";

interface TaskData {
  id: number;
  title: string;
  description: string;
  priority: "Low Priority" | "Medium Priority" | "High Priority";
  status: "Pending" | "In Progress" | "Completed";
  startingDate: Date;
  deadline: Date;
}

const allTasksController = async (
  req: Request<{}, {}, {}, { page: string }>,
  res: Response,
  next: NextFunction,
) => {
  const userId: number = req.userId;
  const taskLimit: number = 6;
  const pageNumber: number =
    req.query.page !== undefined ? parseInt(req.query.page) : 1;
  const taskOffset: number = (pageNumber - 1) * taskLimit;

  try {
    // Counting total number of user's tasks.
    const totalTasks: number = await dbConnection.$count(
      tasks,
      eq(tasks.userId, userId),
    );
    if (totalTasks === 0)
      throw new CustomError("Task Not Available - Try Adding Tasks", 404);

    const totalPages: number = Math.ceil(totalTasks / taskLimit);

    // Extracting limited tasks of a user according to page number.
    const taskList: TaskData[] = await dbConnection
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        priority: tasks.priority,
        status: tasks.status,
        startingDate: tasks.startingDate,
        deadline: tasks.deadline,
      })
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .orderBy(desc(tasks.id)) // Sorting rows in descending order of ID.
      .offset(taskOffset) // Pushing past a certain number of rows from table top.
      .limit(taskLimit); // Extracting only a certain number of row's data.

    // Sending appropriate response to Frontend.
    res.status(200).json({
      status: "success",
      message: "Tasks Fetched Successfully",
      taskList,
      totalTasks,
      totalPages,
      pageNumber,
    });
  } catch (error) {
    console.error("Fetching All Task Server Error");
    next(error);
  }
};

export default allTasksController;
