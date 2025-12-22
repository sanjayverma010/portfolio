import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";   // ✅ FIXED
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    messages: 0,
    projects: 0,
    skills: 0
  });

  const fetchStats = async () => {
    try {
      const msgRes = await api.get("/contact/all");
      const projRes = await api.get("/projects");
      const skillRes = await api.get("/skills");

      setStats({
        messages: msgRes.data.length || 0,
        projects: projRes.data.length || 0,
        skills: skillRes.data.length || 0
      });
    } catch (e) {
      console.log("Stats fetch error:", e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-top">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <p className="welcome">Welcome Admin! Manage your portfolio data.</p>

      <div className="dashboard-grid">

        <div className="stat-card">
          <h2>{stats.messages}</h2>
          <p>Total Messages</p>
          <Link to="/admin/messages" className="card-btn">View Messages</Link>
        </div>

        <div className="stat-card">
          <h2>{stats.projects}</h2>
          <p>Total Projects</p>
          <Link to="/admin/projects" className="card-btn">Manage Projects</Link>
        </div>

        <div className="stat-card">
          <h2>{stats.skills}</h2>
          <p>Total Skills</p>
          <Link to="/admin/skills" className="card-btn">Manage Skills</Link>
        </div>

      </div>
    </div>
  );
}
