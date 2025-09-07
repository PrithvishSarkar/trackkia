import express from "express";
import allTasksController from "../controllers/taskControllers/allTasksController.js";
import analyticsController from "../controllers/taskControllers/analyticsController.js";
import addTaskController from "../controllers/taskControllers/addTaskController.js";
import editTaskController from "../controllers/taskControllers/editTaskController.js";
import editStatusController from "../controllers/taskControllers/editStatusController.js";
import deleteTaskController from "../controllers/taskControllers/deleteTaskController.js";
import { protectedRouteMiddleware } from "../middleware.js";

const router = express.Router();

// All API endpoints should be a 'noun' and not a 'verb' as HTTP Verb is self-explanatory.
router.get("/all-tasks", protectedRouteMiddleware, allTasksController);
router.get("/analytics", protectedRouteMiddleware, analyticsController);
router.post("/add-task", protectedRouteMiddleware, addTaskController);
router.patch("/edit-task/:id", editTaskController);
router.patch("/edit-status/:id", editStatusController);
router.delete("/delete-task/:id", deleteTaskController);

export default router;
