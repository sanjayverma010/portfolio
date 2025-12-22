import { Link, useLocation } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "admin-link active" : "admin-link");

  return (
    <nav className="admin-navbar">
      <div className="admin-left">
        <h2 className="admin-logo">Admin Panel</h2>
      </div>

      <ul className="admin-menu">
        <li><Link to="/admin/dashboard" className={isActive("/admin/dashboard")}>Dashboard</Link></li>
        <li><Link to="/admin/projects" className={isActive("/admin/projects")}>Projects</Link></li>
        <li><Link to="/admin/skills" className={isActive("/admin/skills")}>Skills</Link></li>
        <li><Link to="/admin/achievements" className={isActive("/admin/achievements")}>Achievements</Link></li>
        <li><Link to="/admin/messages" className={isActive("/admin/messages")}>Messages</Link></li>
        <li><Link to="/admin/visitors" className={isActive("/admin/visitors")}>Visitors</Link></li>
      </ul>

      <div className="admin-right">
        <button
          className="admin-logout"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
