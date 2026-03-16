import { motion } from "framer-motion";

export default function AchievementCard({ achievement }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      style={styles.card}
    >
      <h3 style={styles.title}>{achievement.title}</h3>
      <p style={styles.desc}>{achievement.description}</p>
      <span style={styles.date}>{achievement.date}</span>
    </motion.div>
  );
}

const styles = {
  card: {
    padding: 20,
    borderRadius: 16,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e6f0ff",
  },
  title: {
    fontSize: "1.1rem",
    marginBottom: 8,
  },
  desc: {
    fontSize: "0.9rem",
    opacity: 0.85,
    marginBottom: 10,
  },
  date: {
    fontSize: "0.75rem",
    opacity: 0.6,
  },
};
