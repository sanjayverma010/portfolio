import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

export default function Navbar() {

  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "achievements", "certifications", "trainings", "contact"];
      
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActive(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={styles.header}
    >
      <div style={styles.nav}>

        {/* LOGO */}
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          offset={-80}
          onClick={() => setActive("home")}
          style={styles.logo}
        >
          <span style={{ color: "#00eaff" }}>Sanjay</span>
          <span style={{ color: "#ff00e1" }}>Verma</span>
        </ScrollLink>

        {/* NAV LINKS */}
        <nav style={styles.links}>
          <NavItem to="home" label="Home" active={active} setActive={setActive}/>
          <NavItem to="skills" label="Skills" active={active} setActive={setActive}/>
          <NavItem to="projects" label="Projects" active={active} setActive={setActive}/>
          <NavItem to="achievements" label="Achievements" active={active} setActive={setActive}/>
          
          <NavItem to="certifications" label="Certifications" active={active} setActive={setActive}/>
          <NavItem to="trainings" label="Trainings" active={active} setActive={setActive}/>
          <NavItem to="contact" label="Contact" active={active} setActive={setActive}/>

          <Link to="/admin/login" style={{ ...styles.link, ...styles.admin }}>
            Admin
          </Link>
        </nav>

      </div>
    </motion.header>
  );
}

function NavItem({ to, label, active, setActive }) {

  const isActive = active === to;

  return (
    <ScrollLink
      to={to}
      smooth={true}
      duration={500}
      offset={-80}
      onClick={() => setActive(to)}
      style={{
        ...styles.link,
        ...(isActive ? styles.activeLink : {})
      }}
    >
      {label}
    </ScrollLink>
  );
}

const styles = {

  header: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: 72,
    background: "rgba(5,8,20,0.75)",
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
    fontSize: "1.6rem",
    fontWeight: 900,
    letterSpacing: 1,
    cursor: "pointer",
    transition: "0.3s",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },

  link: {
    color: "#cfd8ff",
    fontSize: "0.95rem",
    padding: "8px 16px",
    borderRadius: 999,
    cursor: "pointer",
    transition: "all 0.25s ease",
  },

  activeLink: {
    background: "linear-gradient(90deg,#00eaff,#ff00e1)",
    color: "#041017",
    fontWeight: 700,
    boxShadow: "0 0 12px rgba(0,234,255,0.6)",
  },

  admin: {
    border: "1px solid #ff00e1",
    color: "#ff00e1",
    fontWeight: 700,
    padding: "8px 18px",
  },
};
