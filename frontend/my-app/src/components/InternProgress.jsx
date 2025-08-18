import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { backendUrl } from "@/utils/constant";

const InternProgress = ({token}) => {
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState("");
  const [progress, setProgress] = useState(null);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Fetch all interns
  useEffect(() => {
    axios.get(backendUrl+"/api/auth/interns",{headers:{Authorization:`Bearer: ${token}`}}) // <-- API to get all interns
      .then(res => setInterns(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch intern progress when selected
  useEffect(() => {
    if (!selectedIntern) return;

    const fetchProgress = async () => {
      try {
        // Get attendance records
        const internId=selectedIntern;
        const attendanceRes = await axios.get(backendUrl+`/api/attendance/intern/${internId}`,{headers:{Authorization:`Bearer: ${token}`}});
        const totalDays = attendanceRes.data.length;
        const presentDays = attendanceRes.data.filter(a => a.checkIn && a.checkOut).length;

        // Get tasks
        const taskId=selectedIntern;
        const tasksRes = await axios.get(backendUrl+`/api/tasks/intern/${taskId}`,{headers:{Authorization:`Bearer: ${token}`}});
        const completedTasks = tasksRes.data.filter(t => t.status === "completed").length;
        const pendingTasks = tasksRes.data.length - completedTasks;

        // Get work submissions
        const workRes = await axios.get(backendUrl+`/api/work/intern/${internId}`,{headers:{Authorization:`Bearer: ${token}`}});
        const totalWorks = workRes.data.data.length;

        setProgress({
          totalDays,
          presentDays,
          completedTasks,
          pendingTasks,
          totalWorks
        });
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [selectedIntern]);

  const chartData = progress
    ? [
        { name: "Present Days", value: progress.presentDays },
        { name: "Absent Days", value: progress.totalDays - progress.presentDays },
        { name: "Completed Tasks", value: progress.completedTasks },
        { name: "Pending Tasks", value: progress.pendingTasks }
      ]
    : [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Intern Progress Dashboard</h2>

      {/* Dropdown to select intern */}
      <select
        className="border p-2 mb-6 rounded"
        value={selectedIntern}
        onChange={e => setSelectedIntern(e.target.value)}
      >
        <option value="">-- Select Intern --</option>
        {interns.map(intern => (
          <option key={intern._id} value={intern._id}>
            {intern.name}
          </option>
        ))}
      </select>

      {/* Pie Chart */}
      {progress && (
        <div className="flex flex-col items-center">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          {/* Extra stats */}
          <div className="mt-4 text-lg">
            <p><b>Total Days:</b> {progress.totalDays}</p>
            <p><b>Work Submissions:</b> {progress.totalWorks}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternProgress;
