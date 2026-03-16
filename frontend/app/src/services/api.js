import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------------
// PUBLIC ROUTES (exact match)
// ------------------------------
const PUBLIC_URLS = [
  "/auth/login",
  "/contact", // only POST contact
  "/projects",
  "/skills",
  "/games",
  "/achievements",
  "/visitors"
];

// ------------------------------
// CHECK PUBLIC
// ------------------------------
const isPublicRequest = (url = "") => {
  return PUBLIC_URLS.some((publicPath) =>
    url.startsWith(publicPath)
  );
};

// ------------------------------
// REQUEST INTERCEPTOR
// ------------------------------
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("adminToken");

  if (!isPublicRequest(config.url) && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ------------------------------
// RESPONSE INTERCEPTOR
// ------------------------------
API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
    }

    return Promise.reject(error);
  }
);

export default API;