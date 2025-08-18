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

dotenv.config();
// routes

const app = express();
app.use(express.json());
app.use(cors());

// connect DB
connectDB();

const _dirname=path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/work", workRoutes);


app.use(express.static(path.join(_dirname, "frontend", "my-app", "dist")));
app.get(/(.*)/, (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "my-app", "dist", "index.html"));
});
// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));