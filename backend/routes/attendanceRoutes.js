import express from "express";
import {
  markAttendance,
  getAttendanceByIntern
} from "../controllers/attendanceController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Intern marks attendance (check-in/check-out)
router.post("/", protect, authorize("intern"), markAttendance);

//  view attendance of an intern
router.get("/intern/:internId", protect, getAttendanceByIntern);

export default router;
