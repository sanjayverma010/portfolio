import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      className="bg-gray-900 text-white p-4 flex justify-center gap-6 shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="hover:text-yellow-400">Home</Link>
      <Link to="/skills" className="hover:text-yellow-400">Skills</Link>
      <Link to="/projects" className="hover:text-yellow-400">Projects</Link>
      <Link to="/games" className="hover:text-yellow-400">Games</Link>
      <Link to="/trainings" className="hover:text-yellow-400">Trainings</Link>
      <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
    </motion.nav>
  );
}
