import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/authSlice";
import { backendUrl } from "@/utils/constant";

const Login = () => {

  const dispatch=useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const { data } = await axios.post(backendUrl+"/api/auth/login", formData);
      dispatch(setCredentials({user:data.user,token:data.token}))
      toast.success("Login successful!");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      if (data.user.role === "manager") {
        navigate("/manager-dashboard");
      } else {
        
         try {
            const res=await axios.post(backendUrl+"/api/attendance/",{},{
            headers: { Authorization: `Bearer ${data.token}` },
          })

          //  toast.success(res.data.message);
        } catch (error) {
          //  toast.error(error.response?.data?.message || error.message)
       }
        navigate("/intern-dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 transform transition duration-300 hover:scale-[1.02]"
      >
        <h2 className="text-3xl font-extrabold mb-2 text-center text-blue-600">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please login to continue
        </p>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Enter your email"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Enter your password"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
