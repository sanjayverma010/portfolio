import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";

export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.left}
        >
          <p style={styles.greet}>👋 Hello, I'm</p>

          <h1 style={styles.title}>
            Sanjay <span style={styles.name}>Verma</span>
          </h1>

          <h2 style={styles.subtitle}>
            Software Developer • Automation • IoT • Cloud
          </h2>

          <p style={styles.desc}>
            I build secure, scalable real-world applications using
            Java, Spring Boot, React, Cloud technologies and automation
            systems.
          </p>

          <div style={styles.buttons}>
            <a href="/projects" style={styles.primaryBtn}>
              View Projects
            </a>

            <a href="/Resume.pdf" style={styles.outlineBtn}>
              <FaDownload /> Resume
            </a>
          </div>

          <div style={styles.socials}>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.right}
        >
          <div style={styles.imageCard}>
            <img src="/profile picture.jpeg" alt="profile" style={styles.image} />
          </div>

          <div style={styles.techStack}>
            <span>React</span>
            <span>Spring Boot</span>
            <span>Cloud</span>
            <span>IoT</span>
            <span>Automation</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg,#05060a,#0a0f1e)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#e6f0ff",
    padding: 20,
  },

  container: {
    maxWidth: 1100,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 40,
  },

  left: {
    flex: 1,
    minWidth: 320,
  },

  greet: {
    fontSize: 16,
    opacity: 0.8,
  },

  title: {
    fontSize: "3.2rem",
    fontWeight: 800,
  },

  name: {
    background: "linear-gradient(90deg,#00eaff,#ff00e1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    fontSize: "1.3rem",
    margin: "15px 0",
    opacity: 0.9,
  },

  desc: {
    fontSize: "1rem",
    lineHeight: 1.6,
    opacity: 0.85,
    maxWidth: 500,
  },

  buttons: {
    marginTop: 25,
    display: "flex",
    gap: 15,
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "12px 24px",
    borderRadius: 30,
    background: "linear-gradient(90deg,#00eaff,#ff00e1)",
    color: "#041017",
    fontWeight: 700,
    textDecoration: "none",
  },

  outlineBtn: {
    padding: "12px 24px",
    borderRadius: 30,
    border: "1px solid #00eaff",
    color: "#00eaff",
    textDecoration: "none",
    display: "flex",
    gap: 8,
    alignItems: "center",
  },

  socials: {
    marginTop: 25,
    fontSize: "1.6rem",
    display: "flex",
    gap: 20,
  },

  right: {
    flex: 1,
    minWidth: 280,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  imageCard: {
    width: 250,
    height: 250,
    borderRadius: "50%",
    padding: 5,
    background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },

  techStack: {
    marginTop: 20,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
};