import { useState } from "react";
import { motion } from "framer-motion";
import API from "../../services/api";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await API.post("/contact", form);
      setSuccess(res.data?.message || "Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="title-gradient">Get In Touch</h1>
        <p className="subtitle">Feel free to reach out for work, collaboration, or any questions.</p>
      </motion.div>

      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {success && <div className="msg success">{success}</div>}
        {error && <div className="msg error">{error}</div>}

        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            disabled={loading}
          ></textarea>
        </div>

        <button className="send-btn" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </motion.form>

      <motion.div
        className="contact-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="info-card">
          <h3>Email</h3>
          <p>rssanjayverma010@gmail.com</p>
        </div>
        <div className="info-card">
          <h3>Phone</h3>
          <p>+91 7253094389</p>
          <p>+91 7587691783</p>
        </div>
        <div className="info-card">
          <h3>Location</h3>
          <p>Dayalbagh, Agra</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
