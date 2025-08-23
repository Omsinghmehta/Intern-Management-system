import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from "./routes/taskRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import workRoutes from "./routes/workRoutes.js"
import path from 'path';
import { Server } from "socket.io";
import http from "http";
import Chat from './models/Chat.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // allow all origins, change in production
    methods: ['GET', 'POST']
  }
});

// connect DB
connectDB();

const _dirname = path.resolve();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/work", workRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join room (manager-intern specific)
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // send message
  socket.on("sendMessage", async({ roomId, sender, message }) => {

    const newMsg = new Chat({ roomId, sender, message });
    await newMsg.save();

    io.to(roomId).emit("receiveMessage", { sender, message, time: newMsg.time });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Serve frontend
app.use(express.static(path.join(_dirname, "frontend", "my-app", "dist")));
app.get(/(.*)/, (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "my-app", "dist", "index.html"));
});

// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
