import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import API from "../../services/api";
import "./Skills.css";

const defaultFallback = [
  {
    id: 1,
    category: "Backend Development",
    items: ["Java", "Spring Boot", "REST API", "JWT Authentication"],
    color: "#00eaff",
  },
  {
    id: 2,
    category: "Frontend Development",
    items: ["React (JSX)", "JavaScript", "HTML", "CSS"],
    color: "#ff00e1",
  },
  {
    id: 3,
    category: "Database & Storage",
    items: ["MySQL", "MongoDB", "SQL Queries", "Schema Design"],
    color: "#00ffa6",
  },
  {
    id: 4,
    category: "Tools & Platforms",
    items: ["Git & GitHub", "Postman", "VS Code", "IntelliJ"],
    color: "#ffd600",
  },
  {
    id: 5,
    category: "Soft Skills",
    items: ["Teamwork", "Problem Solving", "Adaptability", "Logical Thinking"],
    color: "#ffffff",
  },
];

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // per-category new skill input text
  const [newSkillInputs, setNewSkillInputs] = useState({});

  // Admin & UI states
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ category: "", color: "#00eaff" });

  // Inline edit state for skill item
  const [editingSkill, setEditingSkill] = useState(null); // {catId, index, value}
  // Editing category
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");

  // Admin system (shortcut mix)
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
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      // Use centralized axios API client (handles baseURL, headers, interceptors)
      const res = await API.get("/skills");
      const data = res.data;

      // normalize incoming data: ensure items is array
      const normalized = (data.data || data || []).map((s) => ({
        id: s.id || s._id || uid(),
        category: s.category || "Untitled",
        items: Array.isArray(s.items)
          ? s.items
          : (s.items || "").toString().split(",").map((t) => t.trim()).filter(Boolean),
        color: s.color || "#00eaff",
      }));

      setSkills(normalized.length ? normalized : defaultFallback);
    } catch (err) {
      // On error (403/404/500), use fallback and log for debugging
      // eslint-disable-next-line no-console
      console.warn("Failed to fetch skills, using fallback:", err?.response?.status, err?.message);
      setSkills(defaultFallback);
    } finally {
      setLoading(false);
    }
  };

  // ---------- CATEGORY CRUD ----------
  const addCategory = () => {
    const name = (categoryForm.category || "").trim();
    if (!name) return;
    const newCat = {
      id: uid(),
      category: name,
      items: [],
      color: categoryForm.color || "#00eaff",
    };
    setSkills([...skills, newCat]);
    setCategoryForm({ category: "", color: "#00eaff" });
    setShowAddCategory(false);
  };

  const startEditCategory = (cat) => {
    setEditingCategoryId(cat.id);
    setEditingCategoryName(cat.category);
  };

  const saveEditCategory = (id) => {
    if (!editingCategoryName.trim()) return;
    setSkills(skills.map((s) => (s.id === id ? { ...s, category: editingCategoryName } : s)));
    setEditingCategoryId(null);
    setEditingCategoryName("");
  };

  const deleteCategory = (id) => {
    if (!window.confirm("Delete this category and all its skills?")) return;
    setSkills(skills.filter((s) => s.id !== id));
  };

  // ---------- SKILL CRUD ----------
  const handleAddSkillInput = (catId, value) => {
    setNewSkillInputs({ ...newSkillInputs, [catId]: value });
  };

  const addSkillToCategory = (catId) => {
    const text = (newSkillInputs[catId] || "").trim();
    if (!text) return;

    setSkills(
      skills.map((s) => (s.id === catId ? { ...s, items: [...s.items, text] } : s))
    );
    setNewSkillInputs({ ...newSkillInputs, [catId]: "" });
  };

  const startEditSkill = (catId, index, value) => {
    setEditingSkill({ catId, index, value });
  };

  const saveEditSkill = () => {
    if (!editingSkill) return;
    const { catId, index, value } = editingSkill;
    if (!value || !value.trim()) return;

    setSkills(
      skills.map((s) =>
        s.id === catId
          ? { ...s, items: s.items.map((it, idx) => (idx === index ? value.trim() : it)) }
          : s
      )
    );
    setEditingSkill(null);
  };

  const cancelEditSkill = () => setEditingSkill(null);

  const deleteSkill = (catId, index) => {
    if (!window.confirm("Delete this skill?")) return;
    setSkills(
      skills.map((s) => (s.id === catId ? { ...s, items: s.items.filter((_, i) => i !== index) } : s))
    );
  };

  // ---------- CATEGORY COLOR change ----------
  const updateCategoryColor = (id, color) => {
    setSkills(skills.map((s) => (s.id === id ? { ...s, color } : s)));
  };

  if (loading) {
    return <div className="skills-loading">Loading skills...</div>;
  }

  return (
    <div className="skills-page">
      <header className="skills-header">
        <h1 className="title-gradient">My Skills</h1>
        <p className="subtitle">A structured overview of my technical and professional abilities.</p>

        <div className="skills-header-actions">
          <button className="admin-login-btn" onClick={handleAdminLogin}>
            Admin Login
          </button>

          {showAdminOptions && (
            <button className="add-category-btn" onClick={() => setShowAddCategory(true)}>
              ➕ Add Category
            </button>
          )}
        </div>
      </header>

      {/* Add Category Panel */}
      <AnimatePresence>
        {showAddCategory && showAdminOptions && (
          <motion.div
            className="add-category-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <h3>Add New Category</h3>
            <input
              placeholder="Category name"
              value={categoryForm.category}
              onChange={(e) => setCategoryForm({ ...categoryForm, category: e.target.value })}
            />
            <div className="color-row">
              <label>Color</label>
              <input
                type="color"
                value={categoryForm.color}
                onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
              />
            </div>

            <div className="add-category-actions">
              <button className="save-btn" onClick={addCategory}>Save</button>
              <button className="cancel-btn" onClick={() => setShowAddCategory(false)}>Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="skills-grid">
        {skills.map((skillCat) => (
          <motion.div key={skillCat.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <Tilt glareEnable={true} scale={1.02} className="tilt-card">
              <div className="skill-card">
                <div className="skill-head">
                  {editingCategoryId === skillCat.id ? (
                    <div style={{ display: "flex", gap: 8, alignItems: "center", width: "100%" }}>
                      <input
                        className="category-edit-input"
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                      />
                      <button className="save-small" onClick={() => saveEditCategory(skillCat.id)}>Save</button>
                      <button className="cancel-small" onClick={() => { setEditingCategoryId(null); setEditingCategoryName(""); }}>Cancel</button>
                    </div>
                  ) : (
                    <>
                      <h2 className="skill-category" style={{ color: skillCat.color }}>{skillCat.category}</h2>
                      {showAdminOptions && (
                        <div className="category-admin-actions">
                          <input
                            type="color"
                            title="Change category color"
                            value={skillCat.color}
                            onChange={(e) => updateCategoryColor(skillCat.id, e.target.value)}
                          />
                          <button className="icon-btn" title="Edit category" onClick={() => startEditCategory(skillCat)}>&#9998;</button>
                          <button className="icon-btn danger" title="Delete category" onClick={() => deleteCategory(skillCat.id)}>&#128465;</button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <ul className="skill-list">
                  {skillCat.items.map((it, idx) =>
                    editingSkill && editingSkill.catId === skillCat.id && editingSkill.index === idx ? (
                      <li key={idx} className="skill-item editing">
                        <input
                          className="skill-edit-input"
                          value={editingSkill.value}
                          onChange={(e) => setEditingSkill({ ...editingSkill, value: e.target.value })}
                        />
                        <div className="skill-edit-actions">
                          <button className="save-small" onClick={saveEditSkill}>Save</button>
                          <button className="cancel-small" onClick={cancelEditSkill}>Cancel</button>
                        </div>
                      </li>
                    ) : (
                      <li key={idx} className="skill-item">
                        <span>{it}</span>
                        {showAdminOptions && (
                          <div className="skill-item-actions">
                            <button className="icon-btn" title="Edit skill" onClick={() => startEditSkill(skillCat.id, idx, it)}>&#9998;</button>
                            <button className="icon-btn danger" title="Delete skill" onClick={() => deleteSkill(skillCat.id, idx)}>&#128465;</button>
                          </div>
                        )}
                      </li>
                    )
                  )}
                </ul>

                {/* Add new skill input */}
                {showAdminOptions && (
                  <div className="add-skill-box">
                    <input
                      className="add-skill-input"
                      placeholder="Add new skill..."
                      value={newSkillInputs[skillCat.id] || ""}
                      onChange={(e) => handleAddSkillInput(skillCat.id, e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkillToCategory(skillCat.id)}
                    />
                    <button className="add-skill-btn" onClick={() => addSkillToCategory(skillCat.id)}>Add</button>
                  </div>
                )}
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
