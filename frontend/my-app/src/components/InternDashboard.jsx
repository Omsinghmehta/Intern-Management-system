import { backendUrl } from "@/utils/constant";
import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useId, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function InternDashboard() {
  const [tasks, setTasks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const attendanceHandle = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/attendance/",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const fun1 = async () => {
          const { data } = await axios.get(backendUrl + "/api/tasks/my-tasks", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTasks(data);
        };

        const fun2 = async () => {
          const { data } = await axios.get(
            backendUrl + "/api/feedback/my-feedback",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setFeedback((prev) => [...prev, ...data]);
        };

        const fun3 = async () => {
          const { data } = await axios.get(
            backendUrl + `/api/attendance/intern/${user.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          let count = 0;
          data?.forEach((item) => {
            if (item.checkOut && String(item.intern) === String(user.id)) {
              count++;
            }
          });
          setAttendance(count);
        };

        await fun1();
        await fun2();
        await fun3();
      } catch (error) {
        toast.error("Failed to load data");
      }
    }

    if (user) fetchData();
  }, [user, token]);

  return (
    <div className="p-4 sm:p-6 lg:px-20 xl:px-32 bg-gray-50 min-h-screen pt-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-600 text-center sm:text-left">
        Welcome, {user?.name} 👋
      </h2>

      {/* Button */}
      <div className="flex justify-center sm:justify-start gap-3 sm:gap-5 my-5">
        <button
          className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow transition text-sm sm:text-base"
          onClick={attendanceHandle}
        >
          CheckOut
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-semibold text-gray-600">
            Tasks Assigned
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-500">
            {tasks.length}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-semibold text-gray-600">
            Tasks Completed
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-green-500">
            {tasks.filter((t) => t.status === "completed").length}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-semibold text-gray-600">
            Attendance
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-purple-500">
            {attendance}
          </p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-700">
          📌 My Tasks
        </h3>
        {tasks.length > 0 ? (
          <ul className="list-disc pl-5 sm:pl-6">
            {tasks.map((task) => (
              <li key={nanoid()} className="mb-1 text-sm sm:text-base">
                <span
                  className="font-medium cursor-pointer hover:underline"
                  onClick={() => navigate(`/task-detail/${task._id}`)}
                >
                  {task.title}
                </span>{" "}
                -{" "}
                <span
                  className={`${
                    task.status === "completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">
            No tasks assigned yet.
          </p>
        )}
      </div>

      {/* Feedback Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-700">
          💬 Feedback
        </h3>
        {feedback.length > 0 ? (
          <ul className="list-disc pl-5 sm:pl-6">
            {feedback.map((fb) => (
              <li key={nanoid()} className="mb-1 text-sm sm:text-base">
                {fb.message}{" "}
                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                  ({new Date(fb.createdAt).toLocaleDateString()})
                </span>
                {/* Rating Stars */}
                <div className="mt-1 sm:mt-0 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < fb.rating ? "text-yellow-500" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">No feedback yet.</p>
        )}
      </div>
    </div>
  );
}
