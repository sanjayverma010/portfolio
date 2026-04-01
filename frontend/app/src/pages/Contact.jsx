import { useState } from "react";
import { FaEnvelope, FaLinkedin, FaPhone } from "react-icons/fa";
import api from "../services/api";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/contact", form);

      setStatus("✅ Message sent successfully!");

      setForm({
        name: "",
        email: "",
        message: ""
      });

    } catch {

      setStatus("❌ Failed to send message");

    }
  };

  return (
    <div style={page}>

      <h1 style={title}>Contact Me</h1>

      <p style={desc}>
        Have a project, job opportunity, or collaboration in mind?
        Send me a message.
      </p>

      <div style={card}>

        {/* MESSAGE FORM (TOP) */}

        <form style={formBox} onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            style={input}
          />

          <input
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            style={input}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            style={textarea}
          />

          <button style={button}>
            Send Message
          </button>

          {status && (
            <p style={statusText}>{status}</p>
          )}

        </form>

        {/* CONTACT INFO (BOTTOM) */}

        <div style={info}>

          <p>
            <FaEnvelope />
            <a href="mailto:rssanjayverma010@gmail.com" style={link}>
              rssanjayverma010@gmail.com
            </a>
          </p>

          <p>
            <FaPhone /> +91 7253094389
          </p>

          <p>
            <FaLinkedin />
            <a
              href="https://linkedin.com/in/sanjay-vema-2144a826b"
              target="_blank"
              rel="noreferrer"
              style={link}
            >
              LinkedIn Profile
            </a>
          </p>

        </div>

      </div>

    </div>
  );
}


/* ================= STYLES ================= */

const page = {
  minHeight: "auto",
  padding: "100px 20px 60px 20px",
  background: "radial-gradient(circle at top,#0b1224,#020617)",
  color: "#e6f0ff",
  textAlign: "center"
};

const title = {
  fontSize: "2.8rem",
  marginBottom: 20,
  fontWeight: 800,
  background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const desc = {
  maxWidth: 600,
  margin: "0 auto 40px",
  opacity: 0.8
};

const card = {
  maxWidth: 520,
  margin: "0 auto",
  padding: 35,
  borderRadius: 20,
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(15px)",
  display: "flex",
  flexDirection: "column",
  gap: 35,
  boxShadow: "0 15px 40px rgba(0,0,0,0.45)"
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: 15
};

const input = {
  padding: 14,
  borderRadius: 10,
  border: "none",
  outline: "none"
};

const textarea = {
  padding: 14,
  borderRadius: 10,
  border: "none",
  minHeight: 120
};

const button = {
  padding: 14,
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 15
};

const statusText = {
  marginTop: 5,
  opacity: 0.85
};

const info = {
  borderTop: "1px solid rgba(255,255,255,0.2)",
  paddingTop: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  fontSize: 16
};

const link = {
  color: "#00eaff",
  marginLeft: 8,
  textDecoration: "none"
};