import { Routes, Route, Navigate } from "react-router-dom";

/* Layout */
import Layout from "./components/Layout";

/* Sections */
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Achievements from "./pages/Achievements";
import Trainings from "./pages/Trainings";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import About from "./pages/About";

/* Admin */
import AdminLogin from "./admin/AdminLogin";
import AdminGuard from "./admin/AdminGuard";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import MessagesAdmin from "./admin/MessagesAdmin";

/* Portfolio Page */
function Portfolio() {
  return (
    <>
      <section id="home"><Home /></section>
      <section id="skills"><Skills /></section>
      <section id="projects"><Projects /></section>
      <section id="achievements"><Achievements /></section>
      <section id="certifications"><Certifications /></section>
      <section id="trainings"><Trainings /></section>
      <section id="contact"><Contact /></section>
      <section id="about"><About /></section>
    </>
  );
}

export default function App() {
  return (
    <Routes>

      {/* PORTFOLIO */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Portfolio />} />
      </Route>

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN PANEL */}
      <Route
        path="/admin/*"
        element={
          <AdminGuard>
            <AdminLayout />
          </AdminGuard>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="messages" element={<MessagesAdmin />} />
        <Route path="projects" element={<Projects />} />
        <Route path="skills" element={<Skills />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="trainings" element={<Trainings />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Route>

    </Routes>
  );
}

