import { Request, Response } from "express";
import db from "../../connection.js";
import { tasks } from "../../drizzle_essentials/schema.js";
import { eq, sql } from "drizzle-orm";

// Extend Express Request interface to include 'user'.
declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

const getAllTasksController = async (req: Request, res: Response) => {
  const pageNumber: number = parseInt(req.query.page as string);
  const taskLimit = 6;
  const taskOffset: number = (pageNumber - 1) * taskLimit;

  try {
    // Extracting task list from Database using user's ID.
    interface taskListType {
      id: number;
      title: string;
      description: string;
      priority: "Low Priority" | "Medium Priority" | "High Priority";
      status: "Pending" | "In Progress" | "Completed";
      startingDate: Date;
      deadline: Date;
    }
    const requiredFields = {
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      priority: tasks.priority,
      status: tasks.status,
      startingDate: tasks.startingDate,
      deadline: tasks.deadline,
    }
    const taskArray: taskListType[] = await db
      .select(requiredFields)
      .from(tasks)
      .where(eq(tasks.userId, req.userId))
      .limit(taskLimit)
      .offset(taskOffset);

    let taskList: null | taskListType[];
    taskArray.length === 0 ? (taskList = null) : (taskList = taskArray);

    // Counting total number of tasks for a particular user.
    const countResult = await db
      .select({ count: sql`COUNT(*)` })
      .from(tasks)
      .where(eq(tasks.userId, req.userId));
    const totalTasks =
      countResult.length > 0 ? Number(countResult[0].count) : 0;
    const totalPages = Math.ceil(totalTasks / taskLimit);

    // Sending appropriate response to Frontend.
    res.status(200).json({
      status: "success",
      message: "Data Fetched Successfully!",
      taskList,
      totalTasks,
      totalPages,
      pageNumber,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "failure",
      message: "Problem Fetching Tasks!",
      error: err.message,
    });
  }
};

export default getAllTasksController;
