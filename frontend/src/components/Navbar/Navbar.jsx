import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => 
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <header className="site-nav">
      <div className="nav-inner">

        <Link to="/" className="logo">
          Portfolio
        </Link>

        <nav className="nav-links">
          <Link className={isActive("/")} to="/">Home</Link>
          <Link className={isActive("/skills")} to="/skills">Skills</Link>
          <Link className={isActive("/projects")} to="/projects">Projects</Link>
          <Link className={isActive("/achievements")} to="/achievements">Achievements</Link>
          <Link className={isActive("/games")} to="/games">Games</Link>
          <Link className={isActive("/contact")} to="/contact">Contact</Link>
          <Link className={isActive("/admin/dashboard")} to="/admin/dashboard">Admin</Link>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;
