import { useState } from "react";
import { useSelector } from "react-redux";
import GetInterns from "./GetInterns";
import AssignTask from "./AssignTask";
import FeedbackForm from "./FeedbackForm";
import AttendanceDashboard from "./AttendanceDashboard";
import ManagerWorkSubmissions from "./ManagerWorkSubmissions";
import InternProgress from "./InternProgress";

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState("interns");
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">
        Manager Dashboard
      </h1>

      {/* Tab buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {[
          { key: "interns", label: "Interns" },
          { key: "tasks", label: "Assign Tasks" },
          { key: "attendance", label: "Attendance" },
          { key: "work", label: "See Work" },
          { key: "feedback", label: "Feedback" },
          { key: "progress", label: "Progress" },

        ].map((tab) => (
          <button
            key={tab.key}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
              activeTab === tab.key
                ? "bg-blue-600 text-white"
                : "bg-white shadow hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        {activeTab === "interns" && (
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
              Manage Interns
            </h2>
            <GetInterns token={token} />
          </div>
        )}

        {activeTab === "tasks" && <AssignTask token={token} />}

        {activeTab === "attendance" && <AttendanceDashboard token={token} />}

        {activeTab === "feedback" && <FeedbackForm />}

        {activeTab === "work" && <ManagerWorkSubmissions token={token} />}

        {activeTab === "progress" && <InternProgress token={token} />}

      </div>
    </div>
  );
}
