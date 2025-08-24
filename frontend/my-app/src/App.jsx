import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InternDashboard from "./components/InternDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import TaskDetail from "./components/TaskDetail";
import Chat from "./components/Chat";
import Notifications from "./components/Notifications";

import { io } from "socket.io-client";
import { backendUrl } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "./redux/notificationsSlice";
import { useEffect } from "react";

const socket = io(backendUrl); // connect socket

export default function App() {
  const { user } = useSelector((state) => state.auth);
  const activeChatRoomId = useSelector((s) => s.chat.activeChatRoomId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const handleMessage = (data) => {
      // Show notification only if not in the active chat
      if (data.roomId !== activeChatRoomId) {
        dispatch(addNotification({
          roomId: data.roomId,
          sender: data.sender,
          message: data.message,
          time: data.time,
        }));
      }
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [user, activeChatRoomId, dispatch]);

  return (
    <Router>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/intern-dashboard" element={<InternDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/task-detail/:id" element={<TaskDetail />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/chat/:internId/:managerId" element={<Chat socket={socket} />} />
        </Routes>
      </main>
    </Router>
  );
}
