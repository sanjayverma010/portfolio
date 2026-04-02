import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://portfolio-1-wz5z.onrender.com";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------------
// PUBLIC ROUTES
// ------------------------------
const PUBLIC_URLS = [
  "/auth/login",
  "/auth/validate",
  "/contact",
  "/projects",
  "/skills",
  "/games",
  "/achievements",
  "/certifications",
  "/trainings",
  "/visitors",
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
      alert("Session expired. Please login again.");
      window.location.href = "/admin/login";
    } else if (error.response?.status === 403) {
      alert("Access denied. Please check your permissions.");
    } else if (error.response?.status === 404) {
      console.error("API endpoint not found:", error.config?.url);
      alert("The requested resource was not found.");
    } else if (error.response?.status >= 500) {
      console.error("Server error:", error.response?.data);
      alert("Server error. Please try again later.");
    } else if (!error.response) {
      console.error("Network error:", error.message);
      alert("Network error. Please check your connection and try again.");
    } else {
      console.error("API error:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    }

    return Promise.reject(error);
  }
);

// ------------------------------
// HELPER FUNCTIONS
// ------------------------------
const api = {
  get: (url, config = {}) =>
    API.get(url, config).then((res) => res.data),

  post: (url, data, config = {}) =>
    API.post(url, data, config).then((res) => res.data),

  put: (url, data, config = {}) =>
    API.put(url, data, config).then((res) => res.data),

  delete: (url, config = {}) =>
    API.delete(url, config).then((res) => res.data),
};

export default api;