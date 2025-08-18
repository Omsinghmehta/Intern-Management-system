import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    intern: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: {
      type: String,
      required: [true, "Feedback message is required"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
