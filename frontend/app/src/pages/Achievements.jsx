import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

export default function Achievements() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAchievements = async () => {

      try {

        const res = await API.get("/achievements");

        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          setItems([]);
        }

      } catch (error) {

        console.error("Achievements API Error:", error);
        setItems([]);

      } finally {

        setLoading(false);

      }

    };

    fetchAchievements();

  }, []);

  return (
    <div style={page}>

      <h1 style={title}>Achievements & Awards</h1>

      <div style={timeline}>

        {loading && (
          <p style={{ textAlign: "center", opacity: 0.7 }}>
            Loading achievements...
          </p>
        )}

        {!loading && items.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.7 }}>
            No achievements found
          </p>
        )}

        {items.map((a, i) => (

          <motion.div
            key={a.id}
            style={row}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            <div style={dot}></div>

            <div style={card}>

              <span style={year}>
                {a.date}
              </span>

              <h3>{a.title}</h3>

              <p style={{ opacity: 0.85 }}>
                {a.description}
              </p>

              {a.category && (
                <span style={badge}>{a.category}</span>
              )}

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  padding: "70px 20px",
  background: "radial-gradient(circle at top,#0b1224,#020617)",
  color: "#e6f0ff"
};

const title = {
  fontSize: "2.8rem",
  fontWeight: 900,
  textAlign: "center",
  marginBottom: 60,
  background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const timeline = {
  maxWidth: 900,
  margin: "0 auto"
};

const row = {
  display: "flex",
  alignItems: "flex-start",
  gap: 24,
  marginBottom: 40
};

const dot = {
  width: 14,
  height: 14,
  marginTop: 18,
  borderRadius: "50%",
  background: "#00eaff",
  boxShadow: "0 0 15px #00eaff"
};

const card = {
  flex: 1,
  background: "rgba(255,255,255,0.07)",
  padding: 24,
  borderRadius: 18,
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.45)"
};

const year = {
  fontSize: 13,
  fontWeight: 700,
  color: "#00eaff"
};

const badge = {
  display: "inline-block",
  marginTop: 14,
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
  background: "linear-gradient(90deg,#00eaff33,#ff00e133)",
  border: "1px solid rgba(255,255,255,0.2)"
};