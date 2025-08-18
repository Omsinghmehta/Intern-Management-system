import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { backendUrl } from "@/utils/constant";

const FeedbackForm = () => {
  const [internId, setInternId] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [interns, setInterns] = useState([]); // store interns

  const { token } = useSelector((state) => state.auth);

  // Fetch interns list
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/auth/interns`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInterns(res.data); // assuming API returns an array of interns
      } catch (err) {
        toast.error("Failed to load interns");
      }
    };

    fetchInterns();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${backendUrl}/api/feedback/give-feedback`,
        { internId, message, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Feedback submitted successfully!");
      setInternId("");
      setMessage("");
      setRating(5);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting feedback");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Give Feedback</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Dropdown for interns */}
        <select
          value={internId}
          onChange={(e) => setInternId(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Intern</option>
          {interns.map((intern) => (
            <option key={intern._id} value={intern._id}>
              {intern.name} ({intern.email})
            </option>
          ))}
        </select>

        {/* Feedback message */}
        <textarea
          placeholder="Write feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border rounded"
          required
        />

        {/* Rating */}
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
