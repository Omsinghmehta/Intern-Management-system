import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import InternDashboard from "./components/InternDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import TaskDetail from "./components/TaskDetail";
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Toaster position="top-center" />
      <Navbar user={user} setUser={setUser} />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/intern-dashboard" element={<InternDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/task-detail/:id" element={<TaskDetail />} />
         
        </Routes>
      </main>
    </Router>
  );
}
