import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "@/utils/constant";

const AttendanceDashboard = ({ token }) => {
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState("");
  const [attendance, setAttendance] = useState([]);

  // Fetch all interns
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/auth/interns", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInterns(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInterns();
  }, [token]);

  // Fetch attendance of selected intern
  const fetchAttendance = async (internId) => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/attendance/intern/${internId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Sort by recent date first
      const sortedAttendance = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setAttendance(sortedAttendance);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInternChange = (e) => {
    const internId = e.target.value;
    setSelectedIntern(internId);
    if (internId) fetchAttendance(internId);
    else setAttendance([]);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        🗓 Intern Attendance Dashboard
      </h2>

      {/* Dropdown */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <select
          value={selectedIntern}
          onChange={handleInternChange}
          className="border px-3 py-2 rounded w-full sm:w-64"
        >
          <option value="">Select an Intern</option>
          {interns.map((intern) => (
            <option key={intern._id} value={intern._id}>
              {intern.name} ({intern.email})
            </option>
          ))}
        </select>
      </div>

      {/* Attendance Records */}
      {attendance.length === 0 ? (
        <p className="text-center text-gray-500">No Record Found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1 text-left">Date</th>
                <th className="border px-2 py-1 text-left">Check In</th>
                <th className="border px-2 py-1 text-left">Check Out</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr
                  key={record._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border px-2 py-1">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="border px-2 py-1">
                    {record.checkIn
                      ? new Date(record.checkIn).toLocaleTimeString()
                      : "—"}
                  </td>
                  <td className="border px-2 py-1">
                    {record.checkOut
                      ? new Date(record.checkOut).toLocaleTimeString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceDashboard;
