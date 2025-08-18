import express from "express";
import {
  createFeedback,
  getFeedbackForLoggedInUser
} from "../controllers/feedbackController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Manager gives feedback
router.post("/give-feedback", protect, authorize("manager"), createFeedback);

// Intern views their feedback
router.get("/my-feedback", protect, authorize("intern"), getFeedbackForLoggedInUser);

export default router;
