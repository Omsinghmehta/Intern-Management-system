import axios from "axios";
import { backendUrl } from "./constant";

const axiosInstance = axios.create({
  baseURL: `${backendUrl}/api`, // your backend URL
  withCredentials: true, // if using cookies
});

export default axiosInstance;
