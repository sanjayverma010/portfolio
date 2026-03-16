import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname.startsWith("/admin");
    }
    return location.pathname === path;
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={styles.header}
    >
      <div style={styles.nav}>
        {/* LOGO */}
        <Link to="/" style={styles.logo}>
          <span style={{ color: "#00eaff" }}>Sanjay</span>
          <span style={{ color: "#ff00e1" }}>Verma</span>
        </Link>

        {/* LINKS */}
        <nav style={styles.links}>
          <NavItem to="/" label="Home" active={isActive("/")} />
          <NavItem to="/projects" label="Projects" active={isActive("/projects")} />
          <NavItem to="/skills" label="Skills" active={isActive("/skills")} />
          <NavItem to="/achievements" label="Achievements" active={isActive("/achievements")} />
          <NavItem to="/contact" label="Contact" active={isActive("/contact")} />

          {/* ADMIN */}
          <NavItem
            to="/admin/login"
            label="Admin"
            active={isActive("/admin")}
            admin
          />
        </nav>
      </div>
    </motion.header>
  );
}

/* ---------------- NAV ITEM ---------------- */
function NavItem({ to, label, active, admin }) {
  return (
    <Link
      to={to}
      style={{
        ...styles.link,
        ...(active ? styles.active : {}),
        ...(admin ? styles.admin : {}),
      }}
    >
      {label}
    </Link>
  );
}

/* ---------------- STYLES ---------------- */
const styles = {
  header: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: 72,
    background: "rgba(5, 8, 20, 0.75)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    zIndex: 1000,
  },

  nav: {
    maxWidth: 1200,
    height: "100%",
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: "1.5rem",
    fontWeight: 900,
    textDecoration: "none",
    letterSpacing: 1,
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: 18,
  },

  link: {
    color: "#cfd8ff",
    textDecoration: "none",
    fontSize: "0.95rem",
    padding: "8px 14px",
    borderRadius: 999,
    transition: "all 0.25s ease",
    whiteSpace: "nowrap",
  },

  active: {
    background: "linear-gradient(90deg,#00eaff,#ff00e1)",
    color: "#041017",
    fontWeight: 700,
  },

  admin: {
    border: "1px solid #ff00e1",
    color: "#ff00e1",
    fontWeight: 700,
  },
};
