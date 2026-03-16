import { useEffect, useState } from "react";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

/* ================= SAFETY ================= */
const parseTech = (tech) => {
  if (!tech) return [];
  if (Array.isArray(tech)) return tech;
  return tech.split(",").map(t => t.trim()).filter(Boolean);
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    API.get("/projects")
      .then(res => setProjects(res.data || []))
      .catch(() => setProjects([]));
  }, []);

  return (
    <div style={page}>
      <h1 style={title}>Featured Projects</h1>

      <p style={subtitle}>
        Some of the projects I built using AI, Web Development and Automation
      </p>

      {projects.length === 0 && (
        <p style={empty}>No projects available</p>
      )}

      <motion.div
        style={grid}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {projects.map(p => (
          <motion.div
            key={p.id}
            variants={cardAnim}
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0 0 40px rgba(255,0,225,0.4)"
            }}
            style={card}
          >
            {p.project_image && (
              <img src={p.project_image} alt="" style={image} />
            )}

            <h3>{p.title}</h3>

            <p style={desc}>
              {p.description?.slice(0, 90)}...
            </p>

            <div style={tags}>
              {parseTech(p.technologies).map((t, i) => (
                <span key={i} style={tag}>{t}</span>
              ))}
            </div>

            <button style={viewBtn} onClick={() => setActive(p)}>
              View Details
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* ================= MODAL ================= */}

      <AnimatePresence>
        {active && (
          <motion.div
            style={overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              style={modal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {active.project_image && (
                <img src={active.project_image} alt="" style={modalImage} />
              )}

              <h2>{active.title}</h2>

              <p style={{ opacity: 0.9 }}>
                {active.description}
              </p>

              <div style={tags}>
                {parseTech(active.technologies).map((t, i) => (
                  <span key={i} style={tag}>{t}</span>
                ))}
              </div>

              <div style={btnRow}>
                {active.github_link && (
                  <a
                    href={active.github_link}
                    target="_blank"
                    rel="noreferrer"
                    style={btn}
                  >
                    GitHub
                  </a>
                )}

                {active.live_demo_link && (
                  <a
                    href={active.live_demo_link}
                    target="_blank"
                    rel="noreferrer"
                    style={btn}
                  >
                    Live Demo
                  </a>
                )}
              </div>

              <button style={closeBtn} onClick={() => setActive(null)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= ANIMATIONS ================= */

const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  padding: 60,
  background: "radial-gradient(circle at top,#0b1224,#020617)",
  color: "white",
};

const title = {
  fontSize: "2.8rem",
  fontWeight: 900,
  textAlign: "center",
  marginBottom: 10,
  background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitle = {
  textAlign: "center",
  opacity: 0.7,
  marginBottom: 40,
};

const empty = {
  textAlign: "center",
  opacity: 0.6,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: 30,
};

const card = {
  background: "rgba(255,255,255,0.06)",
  padding: 26,
  borderRadius: 18,
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 0 25px rgba(0,234,255,0.15)",
  transition: "0.3s",
};

const image = {
  width: "100%",
  borderRadius: 12,
  marginBottom: 14,
};

const modalImage = {
  width: "100%",
  borderRadius: 12,
  marginBottom: 20,
};

const desc = {
  opacity: 0.8,
};

const tags = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 16,
};

const tag = {
  fontSize: 12,
  padding: "6px 12px",
  borderRadius: 999,
  background: "linear-gradient(90deg,#00eaff33,#ff00e133)",
  border: "1px solid rgba(255,255,255,0.2)",
};

const viewBtn = {
  marginTop: 18,
  padding: "8px 14px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  fontWeight: 700,
};

const btnRow = {
  display: "flex",
  gap: 12,
  marginTop: 20,
};

const btn = {
  padding: "10px 16px",
  borderRadius: 10,
  background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  color: "#000",
  fontWeight: 700,
  textDecoration: "none",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modal = {
  background: "#05060a",
  padding: 30,
  borderRadius: 18,
  maxWidth: 500,
  width: "90%",
};

const closeBtn = {
  marginTop: 20,
  padding: "10px 18px",
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  fontWeight: 800,
  cursor: "pointer",
};