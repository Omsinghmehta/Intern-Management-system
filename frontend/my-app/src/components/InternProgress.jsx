import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { backendUrl } from "@/utils/constant";

const InternProgress = ({ token }) => {
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState("");
  const [progress, setProgress] = useState(null);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Fetch all interns
  useEffect(() => {
    axios
      .get(backendUrl + "/api/auth/interns", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setInterns(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  // Fetch intern progress when selected
  useEffect(() => {
    if (!selectedIntern) return;

    const fetchProgress = async () => {
      try {
        const internId = selectedIntern;

        // Attendance
        const attendanceRes = await axios.get(
          backendUrl + `/api/attendance/intern/${internId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const totalDays = attendanceRes.data.length;
        const presentDays = attendanceRes.data.filter((a) => a.checkIn && a.checkOut).length;

        // Tasks
        const tasksRes = await axios.get(
          backendUrl + `/api/tasks/intern/${internId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const completedTasks = tasksRes.data.filter((t) => t.status === "completed").length;
        const pendingTasks = tasksRes.data.length - completedTasks;

        // Work submissions
        const workRes = await axios.get(
          backendUrl + `/api/work/intern/${internId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const totalWorks = workRes.data.data.length;

        setProgress({ totalDays, presentDays, completedTasks, pendingTasks, totalWorks });
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [selectedIntern, token]);

  const chartData = progress
    ? [
        { name: "Present Days", value: progress.presentDays },
        { name: "Absent Days", value: progress.totalDays - progress.presentDays },
        { name: "Completed Tasks", value: progress.completedTasks },
        { name: "Pending Tasks", value: progress.pendingTasks },
      ]
    : [];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        📊 Intern Progress Dashboard
      </h2>

      {/* Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          className="border px-3 py-2 rounded w-full sm:w-64"
          value={selectedIntern}
          onChange={(e) => setSelectedIntern(e.target.value)}
        >
          <option value="">-- Select Intern --</option>
          {interns.map((intern) => (
            <option key={intern._id} value={intern._id}>
              {intern.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chart & Stats */}
      {progress && (
        <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
          <div className="w-full md:w-1/2 h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" outerRadius="80%" label>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Stats</h3>
            <p>
              <b>Total Days:</b> {progress.totalDays}
            </p>
            <p>
              <b>Present Days:</b> {progress.presentDays}
            </p>
            <p>
              <b>Completed Tasks:</b> {progress.completedTasks}
            </p>
            <p>
              <b>Pending Tasks:</b> {progress.pendingTasks}
            </p>
            <p>
              <b>Work Submissions:</b> {progress.totalWorks}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternProgress;
