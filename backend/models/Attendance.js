import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    intern: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    checkIn: {
      type: Date
    },
    checkOut: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
