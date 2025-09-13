import { Request, Response } from "express";
import db from "../../connection.js";
import { tasks } from "../../drizzle_essentials/schema.js";
import { eq } from "drizzle-orm";

// Extend Express Request interface to include 'user'.
declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

interface StatusAnalyticsType {
  name: "Pending" | "In Progress" | "Completed";
  count: number;
}

interface PriorityAnalyticsType {
  name: "Low Priority" | "Medium Priority" | "High Priority";
  count: number;
}

interface CountStatusPriorityType {
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low Priority" | "Medium Priority" | "High Priority";
}

// This function counts the number of tasks status and priority.
const countStatusPriority = (
  taskStatusPriorityData: CountStatusPriorityType[]
) => {
  const analyticsCount = {
    pendingCount: 0,
    inProgressCount: 0,
    completedCount: 0,
    lowPriorityCount: 0,
    mediumPriorityCount: 0,
    highPriorityCount: 0,
  };
  taskStatusPriorityData.forEach(({ status, priority }) => {
    switch (status) {
      case "Pending":
        analyticsCount.pendingCount++;
        break;
      case "In Progress":
        analyticsCount.inProgressCount++;
        break;
      case "Completed":
        analyticsCount.completedCount++;
        break;
      default:
        break;
    }
    switch (priority) {
      case "Low Priority":
        analyticsCount.lowPriorityCount++;
        break;
      case "Medium Priority":
        analyticsCount.mediumPriorityCount++;
        break;
      case "High Priority":
        analyticsCount.highPriorityCount++;
        break;
      default:
        break;
    }
  });
  return analyticsCount;
};

const analyticsController = async (req: Request, res: Response) => {
  const userId: number = req.userId;
  try {
    const taskStatusPriorityData = await db
      .select({ status: tasks.status, priority: tasks.priority })
      .from(tasks)
      .where(eq(tasks.userId, userId));

    if (taskStatusPriorityData.length === 0) {
      res.status(404).json({
        // Status is Success because Database operation is performed successfully.
        status: "success",
        message: `Analytics Data Fetched Successfully. \nNot Task Found!`,
        statusAnalytics: null,
        priorityAnalytics: null,
      });
      return;
    }

    // Calculating analytics count using fetched data from Database.
    const analyticsCount = countStatusPriority(taskStatusPriorityData);

    // Defining analytics Arrays that stores counts of status and priority.
    const statusAnalytics: StatusAnalyticsType[] = [
      { name: "Pending", count: analyticsCount.pendingCount },
      { name: "In Progress", count: analyticsCount.inProgressCount },
      { name: "Completed", count: analyticsCount.completedCount },
    ];
    const priorityAnalytics: PriorityAnalyticsType[] = [
      { name: "Low Priority", count: analyticsCount.lowPriorityCount },
      { name: "Medium Priority", count: analyticsCount.mediumPriorityCount },
      { name: "High Priority", count: analyticsCount.highPriorityCount },
    ];

    res.status(200).json({
      status: "success",
      message: "Analytics Data Fetched Successfully!",
      statusAnalytics,
      priorityAnalytics,
      totalTasks: taskStatusPriorityData.length,
    });
  } catch (err: any) {
    console.error("Task Analytics Fetching Error: ", err.message);
    res.status(500).json({
      status: "failure",
      message: `Problem Fetching Analytics Data. \nPlease refresh the page!`,
    });
  }
};

export default analyticsController;
