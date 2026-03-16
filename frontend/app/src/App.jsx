import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Achievements from "./pages/Achievements";
import Certifications from "./pages/Certifications";
import Trainings from "./pages/Trainings";

export default function App() {
  return (
    <div>

      <section id="home">
        <Home />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="achievements">
        <Achievements />
      </section>

      <section id="certifications">
        <Certifications />
      </section>

      <section id="trainings">
        <Trainings />
      </section>

      <section id="contact">
        <Contact />
      </section>

    </div>
  );
}