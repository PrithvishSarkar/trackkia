import { Request, Response } from "express";
import db from "../../connection.js";
import { tasks } from "../../drizzle_essentials/schema.js";
import { eq } from "drizzle-orm";

const deleteTaskController = async (req: Request, res: Response) => {
  const taskId: number = Number(req.params.id);
  try {
    await db.delete(tasks).where(eq(tasks.id, taskId));
    res.status(200).json({
      status: "success",
      message: "Task Deleted Successfully!",
      taskId, // This will be used in Frontend to update the task list.
    });
  } catch (err) {
    console.error("Task Deletion Error: ", err.message);
    res.status(500).json({
      status: "failure",
      message: `Problem Deleting Task. \nPlease try again later!`,
    });
  }
};

export default deleteTaskController;
