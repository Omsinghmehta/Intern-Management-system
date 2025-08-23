import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { backendUrl } from "@/utils/constant";

const TaskDetail = () => {
  const { id } = useParams();
  const {token,user } = useSelector((state) => state.auth);
  const [task, setTask] = useState(null);
  const [workDesc, setWorkDesc] = useState("");
  const [workTitle, setWorkTitle] = useState("");


  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(backendUrl+`/api/tasks/getTask/${id}`,{
          headers: { Authorization: `Bearer ${token}` },
        });

        setTask(data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load task");
      }
    };
    fetchTask();
  }, [id, token]);

  const changeStatus = async () => {
    try {
      const taskId=id;
      const { data } = await axios.put(backendUrl+
        `/api/tasks/${taskId}/status`,
        {'status':'completed'},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Status updated!");
      setTask({ ...task, status: data.status });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const submitWork = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(backendUrl+
        `/api/work/`,
        { 'title':workTitle, 'description':workDesc,'fileUrl':fileUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Work submitted!");
    //   setTask({ ...task, submittedWork: data.submittedWork });
      setFileUrl('');
      setWorkDesc('');
      setWorkTitle('');
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit work");
    }
  };

  if (!task) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-2xl border border-gray-200">
      {/* Title */}
      <p className="text-gray-700 text-xl mb-6 leading-relaxed">
       <span className=" text-black font-bold">Title:</span> {task.title}
      </p>

      {/* Description */}
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
       <span className=" text-black font-bold">Description:</span> {task.description}
      </p>

      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
       <span className=" text-black font-bold">Deadline:</span> {new Date(task.deadline).toLocaleDateString()}
      </p>

      {/* Status */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              task.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {task.status}
          </span>
        </p>
        <button
          onClick={changeStatus}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
        >
          Change Status
        </button>
      </div>

      {/* Submit Work */}
        <div className="border-t pt-4">
        <h2 className="text-lg font-bold mb-2">Submit Work</h2>
        <form onSubmit={submitWork}>
          <input
            type="text"
            placeholder="Work title..."
            value={workTitle}
            onChange={(e) => setWorkTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Write description..."
            value={workDesc}
            onChange={(e) => setWorkDesc(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows="3"
          />
          <input
            type="text"
            placeholder="File URL"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Work
          </button>
        </form>
      </div>

      {/* Submitted Work Display */}
      {/* {task.submittedWork && (
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Your Submitted Work:</h4>
          <p className="text-gray-700 whitespace-pre-line">
            {task.submittedWork}
          </p>
        </div>
      )} */}

      <button className="bg-black text-white px-4 py-2 rounded my-8">
        <Link to={`/chat/${user.id}/${task.createdBy}`} >
          Chat
        </Link>

      </button>
    </div>
  );
};

export default TaskDetail;
