import express from "express";
import addNewTaskController from "../controllers/taskControllers/addNewTaskController.js";
import { protectedRouteMiddleware } from "../middleware.js";

const router = express.Router();

router.post("/add-task", protectedRouteMiddleware, addNewTaskController);

export default router;