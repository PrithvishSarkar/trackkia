import express from "express";
import addNewTaskController from "../controllers/taskControllers/addNewTaskController.js";
import getAllTasksController from "../controllers/taskControllers/getAllTasksController.js";
import editTaskController from "../controllers/taskControllers/editTaskController.js";
import deleteTaskController from "../controllers/taskControllers/deleteTaskController.js";
import { protectedRouteMiddleware } from "../middleware.js";

const router = express.Router();

// All API endpoints should be a 'noun' and not a 'verb' as HTTP Verb is self-explanatory.
router.post("/add-task", protectedRouteMiddleware, addNewTaskController);
router.get("/all-tasks", protectedRouteMiddleware, getAllTasksController);
// router.get("/analytics", protectedRouteMiddleware, getAnalyticsController);
router.patch("/edit-task/:id", editTaskController);
router.delete("/delete-task/:id", deleteTaskController);

export default router;