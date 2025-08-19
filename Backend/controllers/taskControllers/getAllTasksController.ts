import { Request, Response } from "express";
import db from "../../connection.js";
import { tasks } from "../../drizzle_essentials/schema.js";
import { eq } from "drizzle-orm";

const getAllTasksController = async (req: Request, res: Response) => {
  interface taskListType {
    id: number;
    title: string;
    description: string;
    priority: "Low Priority" | "Medium Priority" | "High Priority";
    status: "Pending" | "In Progress" | "Completed";
    userId: number;
    startingDate: Date;
    deadline: Date;
  }

  try {
    // Extracting task list from Database using user's ID.
    const taskArray: taskListType[] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, req.userId));
    
    let taskList: null | taskListType[];
    taskArray.length === 0 ? taskList = null : taskList = taskArray;

    res
      .status(200)
      .json({
        status: "success",
        message: "Data Fetched Successfully!",
        taskList
      });
  } catch (err) {
    res.status(500).json({ status: "failure", message: "" });
  }
};

export default getAllTasksController;
