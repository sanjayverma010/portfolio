import axios from "axios";

// -------------------------------------------
// BASE URL → MUST point to BACKEND (8080)
// -------------------------------------------
const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------------------------------
// PUBLIC ROUTES — NO TOKEN NEEDED
// Must match backend paths EXACTLY
// -------------------------------------------
const PUBLIC_URLS = [
  "/auth/login",
  "/auth/validate",

  "/contact",
  "/contact/all",

  "/projects",
  "/skills",
  "/games",
  "/achievements",
  "/visitors",

  "/admin/login"
];

// -------------------------------------------
// CHECK IF REQUEST IS PUBLIC
// -------------------------------------------
const isPublicRequest = (url) => {
  if (!url) return false;

  try {
    // Full absolute URL
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const parsed = new URL(url);
      return PUBLIC_URLS.some((p) => parsed.pathname.startsWith(p));
    }
  } catch (_) { }

  // Relative URL
  return PUBLIC_URLS.some((p) => url.startsWith(p));
};

// -------------------------------------------
// REQUEST INTERCEPTOR → Add Token if Required
// -------------------------------------------
API.interceptors.request.use(
  (config) => {
    const url = config.url || "";

    const token =
      localStorage.getItem("authToken") ||
      localStorage.getItem("adminToken");

    // If NOT public and token exists → attach
    if (!isPublicRequest(url) && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------------------------------
// RESPONSE INTERCEPTOR → Handle 401 / 403
// -------------------------------------------
API.interceptors.response.use(
  (response) => response,

  (err) => {
    const status = err?.response?.status;

    // 401 => Token invalid or expired → logout
    if (status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("adminToken");

      window.location.href = "/admin/login";
    }

    // 403 => Forbidden → clear token only
    if (status === 403) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("adminToken");
    }

    return Promise.reject(err);
  }
);

export default API;
