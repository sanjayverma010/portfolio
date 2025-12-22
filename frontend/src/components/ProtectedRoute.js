import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const validate = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setValid(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/auth/validate", {
          method: "GET",   // ✅ FIXED
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setValid(res.ok && data.valid);
      } catch {
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, []);

  if (loading) return <h2>Checking authentication...</h2>;

  if (!valid) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;
