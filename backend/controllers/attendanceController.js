import Attendance from "../models/Attendance.js";


export const markAttendance = async (req, res) => {
  try {
    const internId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // midnight

    let attendance = await Attendance.findOne({
      intern: internId,
      date: today
    });

    if (!attendance) {
      // First time today → Check-in
      attendance = await Attendance.create({
        intern: internId,
        date: today,
        checkIn: new Date()
      });
      return res.status(201).json({ message: "Checked in successfully", attendance });
    }

    if (!attendance.checkOut) {
      // If already checked in but no checkout → Checkout
      attendance.checkOut = new Date();
      await attendance.save();
      return res.status(200).json({ message: "Checked out successfully", attendance });
    }

    res.status(400).json({ message: "You have already checked in and out today" });
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error: error.message });
  }
};


export const getAttendanceByIntern = async (req, res) => {
  try {
    const { internId } = req.params;
    const attendanceRecords = await Attendance.find({ intern: internId }).sort({ date: -1 });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error: error.message });
  }
};
