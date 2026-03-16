import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const linkStyle = ({ isActive }) => ({
    padding: "12px 15px",
    textDecoration: "none",
    color: isActive ? "#00eaff" : "#ccc",
    background: isActive ? "#1a1a1a" : "transparent",
    borderRadius: "6px",
    transition: "0.3s",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f0f0f", color: "white" }}>

      {/* Sidebar */}
      <div style={{
        width: 240,
        background: "#111",
        padding: 25,
        display: "flex",
        flexDirection: "column",
        gap: 15,
        borderRight: "1px solid #222"
      }}>
        <h2 style={{ color: "#00eaff" }}>Admin Panel</h2>

        <NavLink to="/admin/dashboard" style={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/messages" style={linkStyle}>
          Messages
        </NavLink>

        <button
          onClick={logout}
          style={{
            marginTop: "auto",
            padding: "10px",
            background: "#ff0055",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 40 }}>
        <Outlet />
      </div>

    </div>
  );
}