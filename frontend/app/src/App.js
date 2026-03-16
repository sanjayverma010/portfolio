import { Routes, Route, Navigate } from "react-router-dom";

/* Public */
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import About from "./pages/About";

/* Admin */
import AdminLogin from "./admin/AdminLogin";
import AdminGuard from "./admin/AdminGuard";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import MessagesAdmin from "./admin/MessagesAdmin";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="skills" element={<Skills />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* PROTECTED ADMIN */}
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
      </Route>

    </Routes>
  );
}