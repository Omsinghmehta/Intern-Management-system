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
        const { data } = await axios.get(backendUrl+"/api/auth/interns", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInterns(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInterns();
  }, []);

  // Fetch attendance of selected intern
  const fetchAttendance = async (internId) => {
    try {
      const { data } = await axios.get(backendUrl+`/api/attendance/intern/${internId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendance(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInternChange = (e) => {
    const internId = e.target.value;
    setSelectedIntern(internId);
    if (internId) fetchAttendance(internId);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Intern Attendance Dashboard</h2>

      {/* Dropdown for selecting intern */}
      <select
        value={selectedIntern}
        onChange={handleInternChange}
        className="border px-3 py-2 rounded mb-4"
      >
        <option value="">Select an Intern</option>
        {interns.map((intern) => (
          <option key={intern._id} value={intern._id}>
            {intern.name} ({intern.email})
          </option>
        ))}
      </select>

      {/* Show attendance */}
      {attendance.length==0 && <p>No Record Found.</p>}
      {attendance.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold">Attendance Records:</h3>
          <table className="border mt-3 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Check In</th>
                <th className="border px-2 py-1">Check Out</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr key={record._id}>
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
