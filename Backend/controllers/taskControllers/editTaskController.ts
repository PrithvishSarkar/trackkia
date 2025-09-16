import type { Request, Response } from "express";
import db from "../../connection.js";
import { tasks } from "../../drizzle_essentials/schema.js";
import { eq } from "drizzle-orm";

const editTaskController = async (req: Request, res: Response) => {
  interface RequestBodyType {
    title: string;
    description: string;
    priority: "Low Priority" | "Medium Priority" | "High Priority";
    startingDate: string;
    deadline: string;
  }
  const {
    title,
    description,
    priority,
    startingDate,
    deadline,
  }: RequestBodyType = req.body;
  const taskId: number = Number(req.params.id);

  try {
    const updatedData = {
      title,
      description,
      priority,
      startingDate: new Date(startingDate),
      deadline: new Date(deadline),
    };
    await db.update(tasks).set(updatedData).where(eq(tasks.id, taskId));
    res.status(200).json({
      status: "success",
      message: "Task Updated Successfully!",
      updatedTask: {id: taskId, ...updatedData},
    });
  } catch (err: any) {
    console.error("Edit Task Error: ", err.message);
    res.status(500).json({
      status: "failure",
      message: `Problem Editing Task. \nPlease try again later!`,
    });
  }
};

export default editTaskController;
