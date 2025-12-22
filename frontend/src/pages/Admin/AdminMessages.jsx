import { useEffect, useState } from "react";
import "./AdminMessages.css";
import api from "../../services/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/contact/all");  // ✅ FIXED
      setMessages(res.data);
    } catch (err) {
      console.error("Error loading messages:", err);
      alert("Failed to load messages");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-messages-container">
      <h1>User Messages</h1>

      <div className="messages-list">
        {messages.length === 0 ? (
          <p>No messages found</p>
        ) : (
          messages.map((msg) => (
            <div className="message-box" key={msg.id}>
              <h3>{msg.name}</h3>
              <p>{msg.email}</p>
              <p>{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
