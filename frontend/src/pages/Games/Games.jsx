// src/pages/Games/Games.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";   // ✅ FIXED IMPORT
import "./Games.css";

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // ADD NEW GAME POPUP
  const [showAddForm, setShowAddForm] = useState(false);

  // EDIT GAME POPUP
  const [editingGame, setEditingGame] = useState(null);

  // NEW GAME DATA
  const [newGame, setNewGame] = useState({
    name: "",
    level: "",
    experience: "",
    role: "",
    description: "",
    benefits: "",
    achievements: "",
    icon: "🎮",
  });

  // ADMIN MODE
  const isLocalhost = window.location.hostname === "localhost";
  const isAdmin =
    localStorage.getItem("adminGameMode") === "true" || isLocalhost;

  const handleAdminLogin = () => {
    const pass = prompt("Enter Admin Password:");
    if (pass === "mySecret123") {
      localStorage.setItem("adminGameMode", "true");
      alert("Admin Mode Activated!");
      window.location.reload();
    } else {
      alert("Incorrect Password!");
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // ======================================================
  // ✅ FIXED axios-based API call
  // ======================================================
  const fetchGames = async () => {
    try {
      const res = await API.get("/games");
      const data = res.data.data || res.data;

      setGames(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Failed fetching games:", err?.response?.status);

      // fallback data
      setGames([
        {
          _id: "1",
          name: "Football",
          level: "School & Casual Matches",
          experience: "Recreational player",
          role: "Team Player",
          description:
            "Passionate about playing football as a recreational activity.",
          benefits: [
            "Develops teamwork & collaboration",
            "Improves stamina & fitness",
            "Enhances fast decision-making",
          ],
          achievements: ["Participated in inter-school tournaments"],
          icon: "⚽",
        },
        {
          _id: "2",
          name: "Athletics",
          level: "School Competitions",
          experience: "School athlete",
          description:
            "Competed in various long-jump, high-jump and track events.",
          benefits: [
            "Builds discipline & focus",
            "Improves physical agility",
            "Develops competitive spirit",
          ],
          achievements: [
            "Won medals in Long Jump",
            "Achieved success in High Jump",
            "Participated in Relay Races",
          ],
          icon: "🏃‍♂️",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // ADD GAME
  // ======================================================
  const addGame = () => {
    if (!newGame.name.trim()) return;

    const gameEntry = {
      _id: Date.now().toString(),
      ...newGame,
      benefits: newGame.benefits
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean),
      achievements: newGame.achievements
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
    };

    setGames([...games, gameEntry]);

    // Reset form
    setNewGame({
      name: "",
      level: "",
      experience: "",
      role: "",
      description: "",
      benefits: "",
      achievements: "",
      icon: "🎮",
    });

    setShowAddForm(false);
  };

  // ======================================================
  // DELETE GAME
  // ======================================================
  const deleteGame = (id) => {
    if (!window.confirm("Delete this game?")) return;
    setGames(games.filter((g) => g._id !== id));
  };

  // ======================================================
  // SAVE EDIT
  // ======================================================
  const saveGameEdit = () => {
    setGames(
      games.map((g) =>
        g._id === editingGame._id
          ? {
              ...editingGame,
              benefits: editingGame.benefits
                .split(",")
                .map((b) => b.trim()),
              achievements: editingGame.achievements
                .split(",")
                .map((a) => a.trim()),
            }
          : g
      )
    );

    setEditingGame(null);
  };

  if (loading)
    return <div className="games-loading">Loading sports interests...</div>;

  return (
    <div className="games-page-outer">
      <header className="games-header">
        <h1 className="title-gradient">Sports & Athletic Profile</h1>
        <p className="subtitle">
          Showcasing my interest & achievements in sports activities
        </p>

        {!isAdmin && (
          <button className="admin-btn" onClick={handleAdminLogin}>
            🔐 Admin Login
          </button>
        )}

        {isAdmin && (
          <button
            className="add-game-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            ➕ Add New Game
          </button>
        )}
      </header>

      {/* ADD GAME PANEL */}
      <AnimatePresence>
        {showAddForm && isAdmin && (
          <motion.div
            className="add-game-panel"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
          >
            <input
              placeholder="Game Name"
              value={newGame.name}
              onChange={(e) =>
                setNewGame({ ...newGame, name: e.target.value })
              }
            />
            <input
              placeholder="Level"
              value={newGame.level}
              onChange={(e) =>
                setNewGame({ ...newGame, level: e.target.value })
              }
            />
            <input
              placeholder="Experience"
              value={newGame.experience}
              onChange={(e) =>
                setNewGame({ ...newGame, experience: e.target.value })
              }
            />
            <input
              placeholder="Role (optional)"
              value={newGame.role}
              onChange={(e) =>
                setNewGame({ ...newGame, role: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              value={newGame.description}
              onChange={(e) =>
                setNewGame({ ...newGame, description: e.target.value })
              }
            />

            <input
              placeholder="Benefits (comma separated)"
              value={newGame.benefits}
              onChange={(e) =>
                setNewGame({ ...newGame, benefits: e.target.value })
              }
            />

            <input
              placeholder="Achievements (comma separated)"
              value={newGame.achievements}
              onChange={(e) =>
                setNewGame({ ...newGame, achievements: e.target.value })
              }
            />

            <input
              placeholder="Game Icon (emoji)"
              value={newGame.icon}
              onChange={(e) =>
                setNewGame({ ...newGame, icon: e.target.value })
              }
            />

            <button className="save-game-btn" onClick={addGame}>
              Save Game
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDIT GAME POPUP */}
      <AnimatePresence>
        {editingGame && (
          <motion.div
            className="edit-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="edit-popup-content">
              <h2>Edit Game</h2>

              <input
                value={editingGame.name}
                onChange={(e) =>
                  setEditingGame({ ...editingGame, name: e.target.value })
                }
              />

              <input
                value={editingGame.level}
                onChange={(e) =>
                  setEditingGame({ ...editingGame, level: e.target.value })
                }
              />

              <input
                value={editingGame.experience}
                onChange={(e) =>
                  setEditingGame({
                    ...editingGame,
                    experience: e.target.value,
                  })
                }
              />

              <input
                value={editingGame.role}
                onChange={(e) =>
                  setEditingGame({ ...editingGame, role: e.target.value })
                }
              />

              <textarea
                value={editingGame.description}
                onChange={(e) =>
                  setEditingGame({
                    ...editingGame,
                    description: e.target.value,
                  })
                }
              />

              <input
                value={
                  Array.isArray(editingGame.benefits)
                    ? editingGame.benefits.join(", ")
                    : editingGame.benefits
                }
                onChange={(e) =>
                  setEditingGame({
                    ...editingGame,
                    benefits: e.target.value,
                  })
                }
                placeholder="Benefits"
              />

              <input
                value={
                  Array.isArray(editingGame.achievements)
                    ? editingGame.achievements.join(", ")
                    : editingGame.achievements
                }
                onChange={(e) =>
                  setEditingGame({
                    ...editingGame,
                    achievements: e.target.value,
                  })
                }
                placeholder="Achievements"
              />

              <input
                value={editingGame.icon}
                onChange={(e) =>
                  setEditingGame({ ...editingGame, icon: e.target.value })
                }
                placeholder="Icon"
              />

              <div className="edit-actions">
                <button onClick={saveGameEdit}>Save</button>
                <button onClick={() => setEditingGame(null)}>Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GAMES GRID */}
      <div className="games-grid">
        {games.map((g, idx) => (
          <motion.div
            key={g._id || idx}
            className="game-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
          >
            <div className="game-icon">{g.icon}</div>

            <h3 className="game-title">{g.name}</h3>
            <p className="game-level">{g.level}</p>
            <p className="game-exp">{g.experience}</p>

            {g.role && <p className="game-role">Role: {g.role}</p>}

            <p className="game-description">{g.description}</p>

            <div className="game-section">
              <h4>Benefits & Skills:</h4>
              <ul>
                {g.benefits?.map((b, i) => (
                  <li key={i}>✔ {b}</li>
                ))}
              </ul>
            </div>

            {g.achievements?.length > 0 && (
              <div className="game-section">
                <h4>Achievements:</h4>
                <ul>
                  {g.achievements.map((a, i) => (
                    <li key={i}>🏆 {a}</li>
                  ))}
                </ul>
              </div>
            )}

            {isAdmin && (
              <div className="game-actions">
                <button className="icon-btn" onClick={() => setEditingGame(g)}>
                  ✏ Edit
                </button>
                <button
                  className="icon-btn danger"
                  onClick={() => deleteGame(g._id)}
                >
                  ❌ Delete
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Games;
