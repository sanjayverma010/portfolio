// src/pages/Projects/Projects.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Tilt from "react-parallax-tilt";
import API from "../../services/api";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  // ADD / EDIT FORM
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    category: "",
    year: "",
    githubUrl: "",
    liveUrl: "",
    image: "",
  });

  // ADMIN SYSTEM
  const isAdmin = localStorage.getItem("adminMode") === "true";
  const isLocalhost = window.location.hostname === "localhost";
  const showAdminOptions = isAdmin || isLocalhost;

  const handleAdminLogin = () => {
    const pass = prompt("Enter Admin Password:");
    if (pass === "mySecret123") {
      localStorage.setItem("adminMode", "true");
      alert("Admin Mode Enabled");
      window.location.reload();
    } else {
      alert("Wrong Password");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ======================================================
  // ✔️ FIXED BACKEND API CALL
  // ======================================================
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await API.get("/projects");
      const data = res.data;

      // Map backend field names to frontend expected names
      const normalized = (data.data || data || []).map((p) => ({
        ...p,
        _id: p._id || p.id,
        githubUrl: p.githubUrl || p.githubLink || "#",
        liveUrl: p.liveUrl || p.liveDemoLink || "#",
        image: p.image || "/images/project-fallback.png",
      }));
      setProjects(normalized);
    } catch (err) {
      console.warn("Failed to fetch projects:", err?.response?.status);

      setProjects([
        {
          _id: "1",
          title: "Crop Prediction System Using AI",
          description: "AI model to suggest optimal crops.",
          technologies: ["Python", "ML", "Data Analysis"],
          githubUrl: "#",
          liveUrl: "#",
          year: "2024",
          category: "AI",
          image: "/images/ai-project.png",
        },
        {
          _id: "2",
          title: "Restaurant Management System",
          description: "Order handling & automation.",
          technologies: ["MySQL", "UI/UX", "System Architecture"],
          githubUrl: "#",
          liveUrl: "#",
          year: "2024",
          category: "Full-Stack",
          image: "/images/restaurant-system.png",
        },
        {
          _id: "3",
          title: "Web Design Internship Project",
          description: "Responsive UI/UX redesign.",
          technologies: ["HTML", "CSS", "UI/UX"],
          githubUrl: "#",
          liveUrl: "#",
          year: "2024",
          category: "Web",
          image: "/images/web-design.png",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // FILTER SYSTEM
  // ======================================================
  const categories = useMemo(() => {
    const c = new Set(["All"]);
    projects.forEach((p) => p.category && c.add(p.category));
    return [...c];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return projects.filter((p) => {
      if (activeCategory !== "All" && p.category !== activeCategory) return false;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [projects, activeCategory, query]);

  // ======================================================
  // ADD / EDIT PROJECT
  // ======================================================
  const openAddForm = () => {
    setEditId(null);
    setFormData({
      title: "",
      description: "",
      technologies: "",
      category: "",
      year: "",
      githubUrl: "",
      liveUrl: "",
      image: "",
    });
    setShowForm(true);
  };

  const openEditForm = (project) => {
    setEditId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : project.technologies,
      category: project.category,
      year: project.year,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      image: project.image,
    });
    setShowForm(true);
  };

  const saveProject = () => {
    const formattedTechs = formData.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editId) {
      const updated = projects.map((p) =>
        p._id === editId ? { ...p, ...formData, technologies: formattedTechs } : p
      );
      setProjects(updated);
    } else {
      const newProj = {
        _id: Date.now().toString(),
        ...formData,
        technologies: formattedTechs,
        image: formData.image || "/images/project-fallback.jpg",
      };
      setProjects([...projects, newProj]);
    }

    setShowForm(false);
  };

  // ======================================================
  // DELETE PROJECT
  // ======================================================
  const deleteProject = (id) => {
    if (!window.confirm("Delete this project?")) return;
    setProjects(projects.filter((p) => p._id !== id));
  };

  // ======================================================
  // UI
  // ======================================================

  if (loading)
    return (
      <div className="projects-loading">
        <div className="spinner" />
        Loading...
      </div>
    );

  return (
    <div className="projects-page-outer">
      {/* HEADER */}
      <header className="projects-header">
        <h1 className="title-gradient">Selected Projects</h1>
        <p className="subtitle">A curated set of my recent works.</p>

        <button className="admin-login-btn" onClick={handleAdminLogin}>
          Admin Login
        </button>

        {showAdminOptions && (
          <button className="add-btn" onClick={openAddForm}>
            ➕ Add Project
          </button>
        )}
      </header>

      {/* ADD / EDIT PANEL */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="add-project-panel"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <h2>{editId ? "Edit Project" : "Add Project"}</h2>

            <input
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <input
              placeholder="Technologies (comma separated)"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  technologies: e.target.value,
                })
              }
            />

            <input
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />

            <input
              placeholder="Year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />

            <input
              placeholder="GitHub URL"
              value={formData.githubUrl}
              onChange={(e) =>
                setFormData({ ...formData, githubUrl: e.target.value })
              }
            />

            <input
              placeholder="Live URL"
              value={formData.liveUrl}
              onChange={(e) =>
                setFormData({ ...formData, liveUrl: e.target.value })
              }
            />

            <input
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />

            <button className="save-project-btn" onClick={saveProject}>
              {editId ? "Save Changes" : "Save Project"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT GRID */}
      <main className="projects-grid-wrap">
        <motion.div className="projects-grid" initial="hidden" animate="visible">
          {filtered.map((project) => {
            const techArray = Array.isArray(project.technologies)
              ? project.technologies
              : typeof project.technologies === "string"
                ? project.technologies.split(",").map((t) => t.trim())
                : [];

            return (
              <motion.div key={project._id || project.id || project.title}>
                <Tilt glareEnable={true} scale={1.02}>
                  <div className="project-card">
                    <div className="card-top">
                      <div
                        className="card-image"
                        style={{ backgroundImage: `url(${project.image})` }}
                      >
                        <div className="card-overlay" />
                      </div>
                      <div className="card-meta">
                        <div className="card-year">{project.year}</div>
                        <div className="card-category">{project.category}</div>
                      </div>
                    </div>

                    <div className="card-body">
                      <h3 className="card-title">{project.title}</h3>
                      <p className="card-desc">{project.description}</p>

                      <div className="card-techs">
                        {techArray.map((t, i) => (
                          <span key={i} className="tech-chip">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="card-actions">
                        {project.githubUrl && project.githubUrl !== "#" && (
                          <a className="btn-outline" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            GitHub
                          </a>
                        )}
                        {project.liveUrl && project.liveUrl !== "#" && (
                          <a className="btn-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            Live
                          </a>
                        )}
                      </div>

                      {showAdminOptions && (
                        <div className="admin-actions">
                          <button
                            className="edit-btn"
                            onClick={() => openEditForm(project)}
                          >
                            ✏ Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => deleteProject(project._id)}
                          >
                            🗑 Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
};

export default Projects;
