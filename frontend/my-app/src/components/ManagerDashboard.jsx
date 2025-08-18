import { useState } from "react";
import toast from "react-hot-toast";
import GetInterns from "./GetInterns";
import { useSelector } from "react-redux";
import AssignTask from "./AssignTask";
import FeedbackForm from "./FeedbackForm";
import AttendanceDashboard from "./AttendanceDashboard";
import ManagerWorkSubmissions from "./ManagerWorkSubmissions";
import InternProgress from "./InternProgress";

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState("interns");
  const {token}=useSelector(state=>state.auth);
  return (
    <div className="p-6 bg-gray-100 min-h-screen px-64">
      <h1 className="text-3xl font-bold text-center mb-6">Manager Dashboard</h1>

      {/* Tab buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "interns" ? "bg-blue-600 text-white" : "bg-white shadow"
          }`}
          onClick={() => setActiveTab("interns")}
        >
          Interns
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "tasks" ? "bg-blue-600 text-white" : "bg-white shadow"
          }`}
          onClick={() => setActiveTab("tasks")}
        >
          Assign Tasks
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "attendance" ? "bg-blue-600 text-white" : "bg-white shadow"
          }`}
          onClick={() => setActiveTab("attendance")}
        >
          Attendance
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "work" ? "bg-blue-600 text-white" : "bg-white shadow"
          }`}
          onClick={() => setActiveTab("work")}
        >
          See Work
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "feedback" ? "bg-blue-600 text-white" : "bg-white shadow"
          }`}
          onClick={() => setActiveTab("feedback")}
        >
          Feedback
        </button>

        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "progress" ? "bg-blue-600 text-white" : "bg-white shadow"
          }`}
          onClick={() => setActiveTab("progress")}
        >
          Progress
        </button>

        
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg ">
        {activeTab === "interns" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Manage Interns</h2>
            <GetInterns token={token}/>
          </div>
        )}

        {activeTab === "tasks" && (
          <AssignTask token={token}/>
        )}

        {activeTab === "attendance" && (
          <AttendanceDashboard token={token}/>
        )}

        {activeTab === "feedback" && (
         <FeedbackForm />
        )}

        {activeTab === "work" && (
         <ManagerWorkSubmissions token={token} />
        )}

           {activeTab === "progress" && (
         <InternProgress token={token} />
        )}
      </div>
    </div>
  );
}
