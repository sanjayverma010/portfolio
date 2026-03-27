import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaSpinner, FaTrophy } from "react-icons/fa";
import API from "../services/api";

export default function Certifications() {

  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCertifications = async () => {

      try {

        const res = await API.get("/certifications");

        if (Array.isArray(res.data)) {
          setCertifications(res.data);
        } else {
          setCertifications([]);
        }

      } catch (error) {

        console.error("Certification API Error:", error);
        setCertifications([]);

      } finally {

        setLoading(false);

      }

    };

    fetchCertifications();

  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div style={page} id="certifications">

      <div style={header}>
        <FaTrophy style={icon} />
        <h1 style={title}>Certifications</h1>
        <p style={subtitle}>Industry-recognized credentials and achievements</p>
      </div>

      {loading && (
        <div style={loaderContainer}>
          <FaSpinner style={spinner} />
          <p style={empty}>Loading certifications...</p>
        </div>
      )}

      {!loading && certifications.length === 0 && (
        <p style={empty}>No certifications found</p>
      )}

      {!loading && certifications.length > 0 && (
        <motion.div 
          style={grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >

          {certifications.map((cert, i) => (

            <motion.div
              key={cert.id}
              style={card}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(0,234,255,0.3)"
              }}
            >

              <div style={cardHeader}>
                <span style={year}>{cert.date}</span>
                <div style={badge}>✓</div>
              </div>

              <h3 style={cardTitle}>{cert.title}</h3>

              <p style={org}>{cert.organization}</p>

              <p style={desc}>{cert.description}</p>

            </motion.div>

          ))}

        </motion.div>
      )}

    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "auto",
  padding: "100px 40px 80px 40px",
  background: "linear-gradient(180deg,#05060a,#0a0f1e)",
  color: "#e6f0ff",
};

const header = {
  textAlign: "center",
  marginBottom: 70,
  position: "relative"
};

const icon = {
  fontSize: "3rem",
  color: "#00eaff",
  marginBottom: 20,
  display: "block"
};

const title = {
  fontSize: "3.2rem",
  fontWeight: 900,
  marginBottom: 15,
  background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text"
};

const subtitle = {
  fontSize: "1.1rem",
  color: "#00eaff",
  opacity: 0.8,
  fontWeight: 500,
  letterSpacing: 0.5
};

const loaderContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 200,
  gap: 20
};

const spinner = {
  fontSize: "3rem",
  color: "#00eaff",
  animation: "spin 1s linear infinite"
};

const grid = {
  maxWidth: 1100,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: 30
};

const card = {
  background: "linear-gradient(135deg, rgba(0,234,255,0.08) 0%, rgba(255,0,225,0.05) 100%)",
  padding: 32,
  borderRadius: 20,
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(0,234,255,0.2)",
  boxShadow: "0 8px 32px rgba(0,234,255,0.1)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease"
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 16,
};

const badge = {
  background: "linear-gradient(90deg,#00eaff,#ff00e1)",
  color: "#041017",
  width: 32,
  height: 32,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  fontWeight: 700
};

const year = {
  fontSize: 14,
  fontWeight: 700,
  color: "#00eaff",
  textTransform: "uppercase",
  letterSpacing: 1
};

const cardTitle = {
  fontSize: "1.3rem",
  fontWeight: 700,
  marginBottom: 10,
  color: "#fff"
};

const org = {
  fontSize: 15,
  color: "#ff00e1",
  fontWeight: 600,
  marginBottom: 12,
};

const desc = {
  fontSize: 14,
  opacity: 0.75,
  lineHeight: 1.6,
  color: "#cfd8ff"
};

const empty = {
  textAlign: "center",
  opacity: 0.6,
  fontSize: "1.1rem",
  marginTop: 40
};