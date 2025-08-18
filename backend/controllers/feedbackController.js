import Feedback from "../models/Feedback.js";
import User from "../models/User.js";

// Manager gives feedback to intern
export const createFeedback = async (req, res) => {
  try {
    const { internId, message, rating } = req.body;

    // Check if intern exists
    const intern = await User.findById(internId);
    if (!intern || intern.role !== "intern") {
      return res.status(404).json({ message: "Intern not found" });
    }

    const feedback = await Feedback.create({
      intern: internId,
      manager: req.user._id,
      message,
      rating
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Intern views their own feedback
export const getFeedbackForLoggedInUser = async (req, res) => {
  try {
    const feedbackList = await Feedback.find({ intern: req.user._id })
      .populate("manager", "name email")
      .sort({ createdAt: -1 });
    res.json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
