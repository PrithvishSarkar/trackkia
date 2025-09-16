import type { Request, Response } from "express";
import db from "../../connection.js";
import { tasks } from "../../drizzle_essentials/schema.js";
import { eq } from "drizzle-orm";

const editStatusController = async (req: Request, res: Response) => {
  const taskId: number = Number(req.params.id);
  const taskStatus: "Pending" | "In Progress" | "Completed" = req.body;

  // Updating the task in Database.
  try {
    await db
      .update(tasks)
      .set({ status: taskStatus })
      .where(eq(tasks.id, taskId));
    res.status(200).json({
      status: "success",
      message: "Task Status Updated Successfully!",
      taskId,
      taskStatus,
    });
  } catch (err: any) {
    console.error("Task Status Updation Error: ", err.message);
    res.status(500).json({
      status: "failure",
      message: `Problem Updating Task Status. \nPlease try again later!`,
    });
  }
};

export default editStatusController;
