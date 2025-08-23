import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import InternDashboard from "./components/InternDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import TaskDetail from "./components/TaskDetail";
import Chat from "./components/Chat";
import { io } from "socket.io-client";
import { backendUrl } from "./utils/constant";
import { useSelector } from "react-redux";

const socket = io(backendUrl);

export default function App() {
  const { user } = useSelector((state) => state.auth);

  // ask permission once
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    // 🔔 test notification on mount
    if (Notification.permission === "granted") {
      new Notification("✅ Notifications enabled", {
        body: "You will now get chat alerts",
      });


    }
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("📩 receiveMessage event:", data);

      if (
        user &&
        data.sender !== user.name &&
        Notification.permission === "granted"
      ) {
        console.log("🔔 Showing notification...");
        new Notification(`New message from ${data.sender}`, {
          body: data.message,
        });
        toast.success(`💬 New message from ${data.sender}`);

      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user]);

  return (
    <Router>
      <Toaster position="top-center" />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/intern-dashboard" element={<InternDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/task-detail/:id" element={<TaskDetail />} />
          <Route
            path="/chat/:internId/:managerId"
            element={<Chat socket={socket} />}
          />
        </Routes>
      </main>
    </Router>
  );
}
