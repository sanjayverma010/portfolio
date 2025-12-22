// src/utils/API.js
import axios from "axios";

// IMPORTANT: ALL FRONTEND API REQUESTS WILL COME HERE
const API = axios.create({
  baseURL: "http://localhost:8080/api", // Your backend URL
});

// If you need JWT in future, add here:
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("jwt");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default API;
