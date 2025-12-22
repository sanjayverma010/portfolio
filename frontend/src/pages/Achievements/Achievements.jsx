// src/pages/Achievements/Achievements.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";   // ✅ FIXED IMPORT
import "./Achievements.css";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAch, setNewAch] = useState({
    title: "",
    organization: "",
    year: "",
    description: "",
    tags: "",
  });

  // Edit Form
  const [editingAch, setEditingAch] = useState(null);

  // Admin Mode
  const isLocalhost = window.location.hostname === "localhost";
  const isAdmin = localStorage.getItem("adminAchMode") === "true" || isLocalhost;

  const handleAdminLogin = () => {
    const pass = prompt("Enter admin password:");
    if (pass === "mySecret123") {
      localStorage.setItem("adminAchMode", "true");
      alert("Admin mode activated!");
      window.location.reload();
    } else {
      alert("Wrong password!");
    }
  };

  // Fetch Data
  useEffect(() => {
    fetchAchievements();
  }, []);

  // =========================================================
  // ✅ FIXED API CALL USING axios (NOT FETCH)
  // =========================================================
  const fetchAchievements = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.get("/achievements");

      const data = res.data.data || res.data;

      setAchievements(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {
      console.warn("Failed fetching achievements:", err?.response?.status);

      // fallback list
      setAchievements([
        {
          id: 1,
          title: "Inter-School Foldscope & Frugal Innovation Camp",
          organization: "School Event",
          year: "2019, 2022",
          description: "",
          tags: ["Innovation", "Science"],
        },
        {
          id: 2,
          title: "MPRSA Summer Youth Training Camp",
          organization: "MPRSA",
          year: "2017, 2020",
          description: "",
          tags: ["Training", "Youth Leadership"],
        },
        {
          id: 3,
          title: "Drone & IoT Projects – DEI Boot Camp",
          organization: "DEI, Agra",
          year: "2023",
          description: "Contributed to drone & IoT-based automation projects.",
          tags: ["IoT", "Drone", "Automation"],
        },
        {
          id: 4,
          title: "Developed Website for Pahal Horizon",
          organization: "Pahal Horizon",
          year: "2024",
          description: "Created their official responsive website.",
          tags: ["Web Design", "UI/UX"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // ADD ACHIEVEMENT
  // =========================================================
  const addAchievement = () => {
    if (!newAch.title.trim()) return;

    const ach = {
      id: Date.now(),
      ...newAch,
      tags: newAch.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    setAchievements([...achievements, ach]);

    setNewAch({
      title: "",
      organization: "",
      year: "",
      description: "",
      tags: "",
    });

    setShowAddForm(false);
  };

  // =========================================================
  // DELETE ACHIEVEMENT
  // =========================================================
  const deleteAchievement = (id) => {
    if (!window.confirm("Delete this achievement?")) return;
    setAchievements(achievements.filter((a) => a.id !== id));
  };

  // =========================================================
  // SAVE EDITED ACHIEVEMENT
  // =========================================================
  const saveAchievementEdit = () => {
    setAchievements(
      achievements.map((a) =>
        a.id === editingAch.id
          ? {
              ...editingAch,
              tags:
                typeof editingAch.tags === "string"
                  ? editingAch.tags.split(",").map((t) => t.trim())
                  : editingAch.tags,
            }
          : a
      )
    );
    setEditingAch(null);
  };

  if (loading)
    return (
      <div className="achievements-loading">
        <div className="spinner" />
        Loading achievements...
      </div>
    );

  return (
    <div className="achievements-page-outer">
      {/* HEADER */}
      <header className="achievements-header">
        <h1 className="title-gradient">Achievements & Awards</h1>
        <p className="subtitle">
          Small wins, big learnings — selected recognitions, certifications and highlights.
        </p>

        {!isAdmin && (
          <button className="admin-btn" onClick={handleAdminLogin}>
            🔐 Admin Login
          </button>
        )}

        {isAdmin && (
          <button className="add-ach-btn" onClick={() => setShowAddForm(!showAddForm)}>
            ➕ Add Achievement
          </button>
        )}
      </header>

      {/* ADD ACHIEVEMENT PANEL */}
      <AnimatePresence>
        {showAddForm && isAdmin && (
          <motion.div
            className="add-ach-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <input
              placeholder="Title"
              value={newAch.title}
              onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
            />

            <input
              placeholder="Organization"
              value={newAch.organization}
              onChange={(e) =>
                setNewAch({ ...newAch, organization: e.target.value })
              }
            />

            <input
              placeholder="Year"
              value={newAch.year}
              onChange={(e) => setNewAch({ ...newAch, year: e.target.value })}
            />

            <textarea
              placeholder="Description"
              value={newAch.description}
              onChange={(e) =>
                setNewAch({ ...newAch, description: e.target.value })
              }
            />

            <input
              placeholder="Tags (comma separated)"
              value={newAch.tags}
              onChange={(e) => setNewAch({ ...newAch, tags: e.target.value })}
            />

            <button className="save-ach-btn" onClick={addAchievement}>
              Save Achievement
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDIT POPUP */}
      <AnimatePresence>
        {editingAch && (
          <motion.div
            className="edit-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="edit-popup-content">
              <h2>Edit Achievement</h2>

              <input
                value={editingAch.title}
                onChange={(e) =>
                  setEditingAch({ ...editingAch, title: e.target.value })
                }
              />

              <input
                value={editingAch.organization}
                onChange={(e) =>
                  setEditingAch({
                    ...editingAch,
                    organization: e.target.value,
                  })
                }
              />

              <input
                value={editingAch.year}
                onChange={(e) =>
                  setEditingAch({ ...editingAch, year: e.target.value })
                }
              />

              <textarea
                value={editingAch.description}
                onChange={(e) =>
                  setEditingAch({
                    ...editingAch,
                    description: e.target.value,
                  })
                }
              />

              <input
                value={
                  Array.isArray(editingAch.tags)
                    ? editingAch.tags.join(", ")
                    : editingAch.tags
                }
                onChange={(e) =>
                  setEditingAch({ ...editingAch, tags: e.target.value })
                }
              />

              <div className="edit-actions">
                <button onClick={saveAchievementEdit}>Save</button>
                <button onClick={() => setEditingAch(null)}>Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACHIEVEMENTS GRID */}
      <main className="achievements-grid-wrap">
        {error && <div className="fetch-error">{error}</div>}

        <motion.div
          className="achievements-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
          }}
        >
          {achievements.map((a) => {
            const tags = Array.isArray(a.tags) ? a.tags : [];

            return (
              <motion.article
                key={a.id}
                className="achievement-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <header className="card-head">
                  <div className="card-meta">
                    <h3 className="ach-title">{a.title}</h3>
                    {a.organization && (
                      <div className="ach-org">{a.organization}</div>
                    )}
                  </div>

                  <div className="year-edit-wrap">
                    {a.year && <div className="ach-year">{a.year}</div>}

                    {isAdmin && (
                      <div className="edit-del">
                        <button
                          className="icon-btn"
                          onClick={() => setEditingAch(a)}
                        >
                          ✏ Edit
                        </button>
                        <button
                          className="icon-btn danger"
                          onClick={() => deleteAchievement(a.id)}
                        >
                          ❌ Delete
                        </button>
                      </div>
                    )}
                  </div>
                </header>

                {a.description && <p className="ach-desc">{a.description}</p>}

                {tags.length > 0 && (
                  <div className="ach-tags">
                    {tags.map((t, i) => (
                      <span className="tag" key={i}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
};

export default Achievements;
