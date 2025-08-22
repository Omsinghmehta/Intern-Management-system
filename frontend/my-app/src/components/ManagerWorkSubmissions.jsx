import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "@/utils/constant";

const ManagerWorkSubmissions = ({ token }) => {
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState("");
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch interns list
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const res = await axios.get(backendUrl + "/api/auth/interns", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInterns(res.data);
      } catch (error) {
        console.error("Error fetching interns:", error);
      }
    };
    fetchInterns();
  }, [token]);

  // Fetch works of selected intern
  const fetchWorks = async () => {
    if (!selectedIntern) return;
    setLoading(true);
    try {
      const res = await axios.get(
        backendUrl + `/api/work/intern/${selectedIntern}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Sort works by most recent first
      const sortedWorks = res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setWorks(sortedWorks);
    } catch (error) {
      console.error("Error fetching works:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        📂 Intern Work Submissions
      </h2>

      {/* Dropdown + Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
        <select
          value={selectedIntern}
          onChange={(e) => setSelectedIntern(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-64"
        >
          <option value="">-- Select Intern --</option>
          {interns.map((intern) => (
            <option key={intern._id} value={intern._id}>
              {intern.name}
            </option>
          ))}
        </select>

        <button
          onClick={fetchWorks}
          disabled={!selectedIntern}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-700 disabled:opacity-50"
        >
          View Works
        </button>
      </div>

      {/* Works List */}
      {loading ? (
        <p className="text-center text-gray-600">Loading works...</p>
      ) : works.length > 0 ? (
        <ul className="space-y-4">
          {works.map((work) => (
            <li
              key={work._id}
              className="border p-4 rounded shadow-sm bg-gray-50 flex flex-col gap-2"
            >
              <h3 className="font-semibold text-lg">{work.title}</h3>
              <p className="text-gray-700">{work.description}</p>
              {work.fileUrl && (
                <p className="text-blue-500 break-all">
                  <span className="text-gray-700 font-medium">File URL:</span>{" "}
                  <a href={work.fileUrl} target="_blank" rel="noopener noreferrer">
                    {work.fileUrl}
                  </a>
                </p>
              )}
              <p className="text-sm text-green-700 font-bold">
                Submitted on: {new Date(work.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No works submitted yet.</p>
      )}
    </div>
  );
};

export default ManagerWorkSubmissions;
