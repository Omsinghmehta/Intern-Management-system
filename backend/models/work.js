// models/workModel.js
import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  intern: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Work", workSchema);
