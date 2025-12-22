import API from "./api";

export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  localStorage.setItem("authToken", response.data.token);
  localStorage.setItem("adminUsername", response.data.username);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("adminUsername");
};

export const getCurrentUser = async () => {
  const response = await API.post("/auth/validate");
  return response.data;
};
