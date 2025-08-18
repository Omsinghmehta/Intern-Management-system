import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "@/utils/constant";

const ManagerWorkSubmissions = ({token}) => {
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState("");
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch interns list
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const res = await axios.get(backendUrl+"/api/auth/interns",{headers:{
            Authorization:`Bearer ${token}`
        }}); // <-- make sure this API returns interns
        setInterns(res.data);
      } catch (error) {
        console.error("Error fetching interns:", error);
      }
    };
    fetchInterns();
  }, []);

  // ✅ Fetch works of selected intern
  const fetchWorks = async () => {
    if (!selectedIntern) return;
    setLoading(true);
    try {
      const internId=selectedIntern;
      console.log(selectedIntern)
      const res = await axios.get(backendUrl+`/api/work/intern/${internId}`,{headers:{
            Authorization:`Bearer ${token}`
        }});
      setWorks(res.data.data);
    } catch (error) {
      console.error("Error fetching works:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📂 Intern Work Submissions</h2>

      {/* Dropdown for selecting intern */}
      <div className="flex gap-4 items-center mb-6">
        <select
          value={selectedIntern}
          onChange={(e) => setSelectedIntern(e.target.value)}
          className="border px-3 py-2 rounded w-64"
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Works
        </button>
      </div>

      {/* Show works */}
      {loading ? (
        <p>Loading works...</p>
      ) : works.length > 0 ? (
        <ul className="space-y-3">
          {works.map((work) => (
            <li
              key={work._id}
              className="border p-4 rounded shadow-sm bg-gray-50"
            >
              <h3 className="font-semibold">Title: {work.title}</h3>
              <p className="text-gray-700">Description: {work.description}</p>
              <p className="text-blue-500"><span className="text-gray-700">FileUrl:</span> {work.fileUrl}</p>

              <p className="text-sm text-green-700 font-bold">
                Submitted on: {new Date(work.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No works submitted yet.</p>
      )}
    </div>
  );
};

export default ManagerWorkSubmissions;
