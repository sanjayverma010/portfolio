import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Skills() {

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const levelMap = {
    Beginner: 40,
    Intermediate: 65,
    Advanced: 85,
    Expert: 95,
  };

  useEffect(() => {
    API.get("/skills")
      .then(res => setSkills(res.data || []))
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={page}>
        <p style={loadingText}>Loading skills...</p>
      </div>
    );
  }

  const grouped = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div style={page}>

      <h1 style={title}>Skills</h1>

      {Object.keys(grouped).map((category, idx) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
          style={section}
        >

          <h2 style={categoryTitle}>{category}</h2>

          {grouped[category].map((skill) => {

            const level =
              typeof skill.level === "number"
                ? skill.level
                : levelMap[String(skill.level).replace("%", "")] || 50;

            return (
              <div key={skill.id} style={skillCard}>

                <div style={skillHeader}>
                  <span>{skill.name}</span>
                  <span>{level}%</span>
                </div>

                <div style={barBg}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={barFill}
                  />
                </div>

                {skill.description && (
                  <p style={desc}>{skill.description}</p>
                )}

              </div>
            );
          })}

        </motion.div>
      ))}

    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "auto",
  padding: "120px 40px 60px 40px",
  color: "#e6f0ff",
  background: "linear-gradient(180deg,#05060a,#0a0f1e)",
};

const title = {
  fontSize: "2.8rem",
  marginBottom: 40,
  textAlign: "center",
  fontWeight: 900,
  background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const section = {
  maxWidth: 900,
  margin: "0 auto 50px",
};

const categoryTitle = {
  fontSize: "1.6rem",
  marginBottom: 20,
  color: "#7dd3fc",
};

const skillCard = {
  marginBottom: 22,
  padding: 16,
  borderRadius: 12,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
};

const skillHeader = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.95rem",
  marginBottom: 6,
};

const barBg = {
  height: 10,
  width: "100%",
  background: "rgba(255,255,255,0.12)",
  borderRadius: 999,
  overflow: "hidden",
};

const barFill = {
  height: "100%",
  background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  borderRadius: 999,
  boxShadow: "0 0 8px #00eaff",
};

const desc = {
  fontSize: "0.85rem",
  opacity: 0.7,
  marginTop: 6,
};

const loadingText = {
  textAlign: "center",
  padding: 80,
  fontSize: 18,
  opacity: 0.7,
};