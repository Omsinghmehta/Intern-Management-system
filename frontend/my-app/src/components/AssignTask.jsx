import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl } from "@/utils/constant";

const AssignTask = ({ token }) => {
  const [interns, setInterns] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    internId: "",
  });

  // Fetch interns list
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/auth/interns", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInterns(data);
      } catch (err) {
        toast.error("Failed to load interns");
      }
    };
    fetchInterns();
  }, [token]);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backendUrl + "/api/tasks/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task assigned successfully!");
      setFormData({ title: "", description: "", deadline: "", internId: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign task");
    }
  };

  return (
    <div className="max-w-md sm:max-w-lg mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-2xl mt-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
        Assign Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
          required
        />

        {/* Deadline */}
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Intern Dropdown */}
        <select
          name="internId"
          value={formData.internId}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Intern</option>
          {interns.map((intern) => (
            <option key={intern._id} value={intern._id}>
              {intern.name} ({intern.email})
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default AssignTask;
