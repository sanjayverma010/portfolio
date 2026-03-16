import { useEffect, useState } from "react";
import API from "../services/api";

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await API.get("/contact/all");
      setMessages(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ color: "#00eaff", marginBottom: 20 }}>
        Messages
      </h1>

      {loading && <p style={{ color: "#aaa" }}>Loading messages...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && messages.length === 0 && (
        <p style={{ color: "#aaa" }}>No messages found.</p>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            background: "#1a1a1a",
            padding: 20,
            marginBottom: 15,
            borderRadius: 8,
            border: "1px solid #222",
          }}
        >
          <p>
            <strong style={{ color: "#00eaff" }}>Name:</strong>{" "}
            {msg.name}
          </p>

          <p>
            <strong style={{ color: "#00eaff" }}>Email:</strong>{" "}
            {msg.email}
          </p>

          <p>
            <strong style={{ color: "#00eaff" }}>Message:</strong>
          </p>

          <p style={{ color: "#ccc", marginTop: 5 }}>
            {msg.message}
          </p>
        </div>
      ))}
    </div>
  );
}