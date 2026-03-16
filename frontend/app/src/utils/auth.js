export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAdmin = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "ROLE_ADMIN";
  } catch (err) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
