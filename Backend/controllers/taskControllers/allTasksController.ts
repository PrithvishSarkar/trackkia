import type { Request, Response, NextFunction } from "express";
import { dbConnection } from "@/database/dbConnection.js";
import { tasks } from "@/database/schema.js";
import { eq } from "drizzle-orm";

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
  const pageNumber: number = parseInt(req.query.page);
  const taskOffset: number = (pageNumber - 1) * taskLimit;

  try {
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
      .offset(taskOffset)
      .limit(taskLimit);

    // Counting total number of user's tasks.
    const totalTasks: number = await dbConnection.$count(
      tasks,
      eq(tasks.userId, userId),
    );
    const totalPages: number = Math.ceil(totalTasks / taskLimit);

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
