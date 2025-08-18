// models/taskModel.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  deadline: Date,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
