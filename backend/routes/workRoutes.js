// routes/workRoutes.js
import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { submitWork, getInternWorkSubmissions } from "../controllers/workController.js";

const router = express.Router();

// Intern submits work
router.post("/", protect, authorize("intern"), submitWork);

// Manager views all work submitted by a specific intern
router.get("/intern/:internId", protect, authorize("manager"), getInternWorkSubmissions);

export default router;
