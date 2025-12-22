// src/pages/Admin/Messages.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";
import { motion } from "framer-motion";
import "./Messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null); // selected message for modal
  const [error, setError] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/messages");
      // API returns array or { data: [] }
      const data = res.data || [];
      setMessages(Array.isArray(data) ? data : (data.data || []));
    } catch (err) {
      console.error(err);
      setError("Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const openMessage = (msg) => setActive(msg);
  const closeModal = () => setActive(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await API.delete(`/messages/${id}`);
      // optimistic UI
      setMessages((prev) => prev.filter((m) => (m.id || m._id) !== id && (m.id || m._id) !== String(id)));
      if (active && (active.id || active._id) === id) closeModal();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Could not delete message");
    }
  };

  return (
    <div className="admin-messages-page">
      <header className="messages-header">
        <h1>Messages</h1>
        <p className="subtitle">All messages sent via the contact form</p>
      </header>

      {loading ? (
        <div className="messages-loading">Loading messages...</div>
      ) : error ? (
        <div className="messages-error">{error}</div>
      ) : (
        <div className="messages-grid">
          {messages.length === 0 && <div className="empty">No messages found</div>}

          {messages.map((m, idx) => {
            const id = m.id || m._id;
            return (
              <motion.article
                key={id || idx}
                className="message-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                <div className="card-row">
                  <div className="card-info">
                    <div className="card-name">{m.name}</div>
                    <div className="card-email">{m.email}</div>
                    <div className="card-time">{new Date(m.createdAt || m.visit_time || Date.now()).toLocaleString()}</div>
                  </div>

                  <div className="card-actions">
                    <button className="btn-outline" onClick={() => openMessage(m)}>View</button>
                    <button className="btn-danger" onClick={() => handleDelete(id)}>Delete</button>
                  </div>
                </div>

                <div className="card-snippet">{(m.message || "").slice(0, 160)}{(m.message || "").length > 160 ? "..." : ""}</div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* modal */}
      {active && (
        <div className="modal-backdrop" onClick={closeModal}>
          <motion.div className="modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{active.name}</h3>
              <div className="modal-meta">{active.email} • {new Date(active.createdAt || Date.now()).toLocaleString()}</div>
            </div>
            <div className="modal-body">
              <p>{active.message}</p>
            </div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => handleDelete(active.id || active._id)}>Delete</button>
              <button className="btn-primary" onClick={closeModal}>Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Messages;
