import { motion } from "framer-motion";

export default function SkillCard({ skill }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>

      <div style={styles.barBg}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1 }}
          style={styles.barFill}
        />
      </div>

      {skill.description && (
        <p style={styles.desc}>{skill.description}</p>
      )}
    </div>
  );
}

const styles = {
  card: {
    marginBottom: 18,
    color: "#e6f0ff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.9rem",
    marginBottom: 6,
  },
  barBg: {
    height: 10,
    width: "100%",
    background: "rgba(255,255,255,0.1)",
    borderRadius: 999,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    background: "linear-gradient(90deg,#00eaff,#ff00e1)",
    borderRadius: 999,
  },
  desc: {
    fontSize: "0.8rem",
    opacity: 0.7,
    marginTop: 6,
  },
};
