import { motion } from "framer-motion";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, delay: 0.2 } },
    float: { y: [0, -20, 0], transition: { duration: 4, repeat: Infinity } }
  };

  return (
    <section id="home" style={styles.page}>
      <div style={styles.background} />
      
      <div style={styles.container}>

        {/* LEFT SIDE */}
        <motion.div
          initial="hidden"
          animate="show"
          style={styles.left}
        >
          <motion.p style={styles.greet} variants={textVariants} custom={0}>
            👋 Hello, I'm a passionate developer
          </motion.p>

          <motion.h1 style={styles.title} variants={textVariants} custom={1}>
            Sanjay <span style={styles.name}>Verma</span>
          </motion.h1>

          <motion.h2 style={styles.subtitle} variants={textVariants} custom={2}>
            <span style={styles.role}>Full Stack Developer</span>
            <span style={styles.divider}>•</span>
            <span style={styles.role}>Problem Solver</span>
            <span style={styles.divider}>•</span>
            <span style={styles.role}>Tech Enthusiast</span>
          </motion.h2>

          <motion.p style={styles.desc} variants={textVariants} custom={3}>
            I craft secure, scalable applications using modern technologies like Java, Spring Boot and  Specialized in backend architecture, cloud solutions, and automation.
          </motion.p>

          <motion.div style={styles.buttons} variants={buttonVariants} initial="hidden" animate="show">
            <motion.a 
              href="#projects" 
              style={styles.primaryBtn}
              whileHover="hover"
              variants={buttonVariants}
            >
              <span>Explore Projects</span>
            </motion.a>

            <motion.a 
              href="/Resume.pdf" 
              download 
              style={styles.outlineBtn}
              whileHover="hover"
              variants={buttonVariants}
            >
              <FaDownload /> Download Resume
            </motion.a>
          </motion.div>

          <motion.div style={styles.socials} variants={textVariants} custom={4}>
            <motion.a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              style={styles.icon}
              whileHover={{ scale: 1.3, color: "#00eaff" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>

            <motion.a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              style={styles.icon}
              whileHover={{ scale: 1.3, color: "#ff00e1" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
          </motion.div>

          <motion.div style={styles.stats} variants={textVariants} custom={5}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>5+</div>
              <div style={styles.statLabel}>Projects</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>3+</div>
              <div style={styles.statLabel}>Trainings</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>8+</div>
              <div style={styles.statLabel}>Certifications</div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          style={styles.right}
          initial="hidden"
          animate={["show", "float"]}
          variants={imageVariants}
        >
          <div style={styles.imageCard}>
            <div style={styles.imageBorder} />
            <img
              src="/profile picture.jpeg"
              alt="profile"
              style={styles.image}
            />
          </div>

          <motion.div style={styles.techStack}>
            {["Spring Boot", "Java", "Cloud", "MySQL" , "HTML" , "CSS" ].map((tech, i) => (
              <motion.span 
                key={i}
                style={styles.tech}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.1, color: "#00eaff" }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
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
    padding: "100px 20px 40px",
    position: "relative",
    overflow: "hidden"
  },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(0, 234, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 0, 225, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: "none"
  },

  container: {
    maxWidth: 1300,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 60,
    position: "relative",
    zIndex: 1
  },

  left: {
    flex: 1,
    minWidth: 320,
  },

  greet: {
    fontSize: "1.1rem",
    opacity: 0.8,
    fontWeight: 500,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#00eaff",
    marginBottom: 10
  },

  title: {
    fontSize: "4rem",
    fontWeight: 900,
    lineHeight: 1.2,
    marginBottom: 15,
    letterSpacing: -1
  },

  name: {
    background: "linear-gradient(90deg,#00eaff,#ff00e1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },

  subtitle: {
    fontSize: "1.3rem",
    margin: "20px 0 25px",
    opacity: 0.85,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap"
  },

  role: {
    background: "linear-gradient(90deg,#00eaff,#ff00e1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: 600
  },

  divider: {
    color: "#00eaff",
    opacity: 0.5
  },

  desc: {
    fontSize: "1.05rem",
    lineHeight: 1.8,
    opacity: 0.8,
    maxWidth: 550,
    marginBottom: 30
  },

  buttons: {
    marginTop: 35,
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "14px 32px",
    borderRadius: 50,
    background: "linear-gradient(90deg,#00eaff,#ff00e1)",
    color: "#041017",
    fontWeight: 700,
    textDecoration: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
    fontSize: "1rem",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    boxShadow: "0 0 30px rgba(0,234,255,0.3)",
  },

  outlineBtn: {
    padding: "14px 32px",
    borderRadius: 50,
    border: "2px solid #00eaff",
    color: "#00eaff",
    textDecoration: "none",
    display: "inline-flex",
    gap: 10,
    alignItems: "center",
    fontWeight: 700,
    transition: "all 0.3s ease",
    cursor: "pointer",
    fontSize: "1rem"
  },

  socials: {
    marginTop: 40,
    fontSize: "1.8rem",
    display: "flex",
    gap: 25,
    alignItems: "center"
  },

  icon: {
    color: "#cfd8ff",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  stats: {
    marginTop: 50,
    display: "flex",
    gap: 40,
    paddingTop: 30,
    borderTop: "1px solid rgba(255,255,255,0.1)"
  },

  statItem: {
    textAlign: "center"
  },

  statNumber: {
    fontSize: "2rem",
    fontWeight: 900,
    background: "linear-gradient(90deg,#00eaff,#ff00e1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1
  },

  statLabel: {
    fontSize: "0.9rem",
    opacity: 0.7,
    marginTop: 8,
    textTransform: "uppercase",
    letterSpacing: 1
  },

  right: {
    flex: 1,
    minWidth: 280,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative"
  },

  imageCard: {
    position: "relative",
    width: 280,
    height: 280,
    borderRadius: "50%",
    overflow: "hidden"
  },

  imageBorder: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #00eaff, #ff00e1)",
    padding: 3,
    animation: "spin 8s linear infinite",
    zIndex: 0
  },

  image: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    zIndex: 1,
    border: "3px solid #05060a"
  },

  techStack: {
    marginTop: 30,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 350
  },

  tech: {
    border: "1.5px solid rgba(0,234,255,0.5)",
    color: "#00eaff",
    padding: "8px 16px",
    borderRadius: 25,
    fontSize: 13,
    fontWeight: 600,
    backgroundColor: "rgba(0,234,255,0.05)",
    transition: "all 0.3s ease",
  },

};