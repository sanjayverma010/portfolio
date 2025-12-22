// src/pages/Home/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">

      {/* Floating Background Circles */}
      <div className="floating-circles">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>

      <motion.div
        className="home-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* ⭐ 3D NEON PROFILE DP ⭐ */}
        <div className="profile-3d-container">
          <div className="profile-3d-glow"></div>
          <div className="profile-3d-ring"></div>
          <div className="profile-3d-ring2"></div>
          <img src="/profile.jpg" alt="Profile" className="profile-3d-img" />
        </div>

        {/* NAME */}
        <h1 className="hero-title">
          Hi, I'm <span>Sanjay Verma</span>
        </h1>

        {/* TYPEWRITER — FIXED (p ➝ div) */}
        <div className="hero-subtitle">
          <Typewriter
            options={{
              strings: [
                "Full-Stack Developer",
                "Java Developer",
                "React.js Developer",
                "Spring Boot Backend Developer",
                "UI/UX Enthusiast"
              ],
              autoStart: true,
              loop: true,
              delay: 60
            }}
          />
        </div>

        {/* BUTTONS */}
        <div className="hero-buttons">
          <Link to="/projects" className="btn-primary btn-glow">🚀 View Projects</Link>
          <Link to="/contact" className="btn-glow">📩 Contact Me</Link>
          <a href="/resume.pdf" download className="btn-outline">📄 Download CV</a>
        </div>

        {/* SOCIAL LINKS */}
        <div className="social-links">
          <a href="https://github.com/sanjayverma010" target="_blank" rel="noopener noreferrer">
            🐙 GitHub
          </a>
          <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer">
            🔗 LinkedIn
          </a>
        </div>

      </motion.div>
    </div>
  );
};

export default Home;
