import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f0f0f",
      color: "white"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          padding: 40,
          background: "#1a1a1a",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          gap: 15,
          width: 300,
          border: "1px solid #222"
        }}
      >
        <h2 style={{ textAlign: "center", color: "#00eaff" }}>
          Admin Login
        </h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: 10,
            background: "#111",
            border: "1px solid #333",
            color: "white",
            borderRadius: 6
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: 10,
            background: "#111",
            border: "1px solid #333",
            color: "white",
            borderRadius: 6
          }}
        />

        <button
          type="submit"
          style={{
            padding: 12,
            background: "linear-gradient(90deg,#00eaff,#ff00e1)",
            border: "none",
            borderRadius: 6,
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}