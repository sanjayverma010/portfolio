import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Achievements from "./pages/Achievements";
import Certifications from "./pages/Certifications";
import Trainings from "./pages/Trainings";

function App() {
  return (
    <div style={styles.page}>

      {/* HOME */}
      <section id="home" style={styles.homeSection}>
        <Home />
      </section>

      {/* ALL OTHER SECTIONS */}
      <section id="skills" style={styles.section}>
        <Skills />
      </section>

      <section id="projects" style={styles.section}>
        <Projects />
      </section>

      <section id="achievements" style={styles.section}>
        <Achievements />
      </section>

      <section id="certifications" style={styles.section}>
        <Certifications />
      </section>

      <section id="trainings" style={styles.section}>
        <Trainings />
      </section>

      <section id="contact" style={styles.section}>
        <Contact />
      </section>

    </div>
  );
}

export default App;

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "linear-gradient(180deg,#05060a,#0a0f1e)",
    color: "#e6f0ff",
    scrollBehavior: "smooth",
  },

  homeSection: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  section: {
    padding: "60px 20px",   // 👈 reduced gap
    scrollMarginTop: "80px",
  },
};