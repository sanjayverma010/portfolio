import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 200 }}
      style={styles.card}
    >
      <h3 style={styles.title}>{project.title}</h3>

      <p style={styles.desc}>{project.description}</p>

      <div style={styles.tech}>
        {project.technologies?.map((t, i) => (
          <span key={i} style={styles.tag}>{t}</span>
        ))}
      </div>

      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" style={styles.link}>
          View Project →
        </a>
      )}
    </motion.div>
  );
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 16,
    color: "#e6f0ff",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: 8,
  },
  desc: {
    fontSize: "0.9rem",
    opacity: 0.85,
    marginBottom: 12,
  },
  tech: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  tag: {
    fontSize: "0.75rem",
    padding: "4px 10px",
    borderRadius: 20,
    background: "linear-gradient(90deg,#00eaff,#ff00e1)",
    color: "#041017",
    fontWeight: 600,
  },
  link: {
    color: "#7dd3fc",
    textDecoration: "none",
    fontSize: "0.85rem",
  },
};
