import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  roomId: { type: String, required: true }, 
  sender: { type: String, required: true }, 
  message: { type: String, required: true },
  time: { type: Date, default: Date.now }
});

export default mongoose.model("Chat", chatSchema);
