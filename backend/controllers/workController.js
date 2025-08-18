// controllers/workController.js
import Work from "../models/work.js";

// Intern submits work
export const submitWork = async (req, res) => {
  try {
    const work = await Work.create({
      intern: req.user.id,
      title: req.body.title,
      description: req.body.description,
      fileUrl: req.body.fileUrl // optional
    });
    res.status(201).json({ success: true, data: work });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Manager views work of a specific intern
export const getInternWorkSubmissions = async (req, res) => {
  try {
    const works = await Work.find({ intern: req.params.internId });
    res.status(200).json({ success: true, data: works });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
