// controllers/taskController.js
import Task from "../models/Task.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

// Manager: Create a task for an intern
export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, internId } = req.body;

    // Check if intern exists
    const intern = await User.findById(internId);
    if (!intern || intern.role !== "intern") {
      return res.status(404).json({ message: "Intern not found" });
    }

    const task = await Task.create({
      title,
      description,
      deadline,
      assignedTo: internId,
      createdBy: req.user._id, // Manager who created it
    });

    await sendEmail({
      to: intern.email,
      subject: "New Task Assigned 🚀",
      text: `Hi ${intern.name},\n\nYou have been assigned a new task: "${title}". Please complete it before ${new Date(deadline).toLocaleDateString()}.`,
      html: `
        <h3>Hello ${intern.name},</h3>
        <p>You have been assigned a new task:</p>
        <b>Title: ${title}</b>
        <p>Description: ${description}</p>
        <p><b>Deadline:</b> ${new Date(deadline).toLocaleDateString()}</p>
        <p>Good luck! 👍</p>
      `,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manager: Update task status (completed / pending)
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manager: Get tasks of a specific intern
export const getTasksByIntern = async (req, res) => {
  try {
    const { internId } = req.params;

    const tasks = await Task.find({ assignedTo: internId }).populate("assignedTo", "name email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

// Intern: Get their own tasks
export const getTasksForLoggedInUser = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
