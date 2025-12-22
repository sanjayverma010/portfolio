import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate token on page load
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/auth/validate", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser({ username: data.username });
        } else {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUsername");
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }

      setLoading(false);
    };

    validateToken();
  }, []);

  // Login function (POST)
  const login = async ({ username, password }) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUsername", data.username);
      setUser({ username: data.username });
      return data;
    } else {
      throw new Error(data.message || "Login failed");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
