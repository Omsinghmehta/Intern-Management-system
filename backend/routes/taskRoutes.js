import express from "express";
import {
  createTask,
  updateTaskStatus,
  getTasksByIntern,
  getTasksForLoggedInUser,
  getTaskById
} from "../controllers/taskController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Manager creates a task for intern
router.post("/create", protect, authorize("manager"), createTask);

// Manager updates a task status
router.put("/:taskId/status", protect, authorize("intern"), updateTaskStatus);

// Manager gets tasks of a specific intern
router.get("/intern/:internId", protect, authorize("manager"), getTasksByIntern);

router.get("/getTask/:id", protect, getTaskById);

// Intern gets their own tasks
router.get("/my-tasks", protect, authorize("intern"), getTasksForLoggedInUser);

export default router;
