import { motion } from "framer-motion";

export default function Games() {
  return (
    <motion.div 
      className="p-8 text-center text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6">Games</h1>
      <p className="mt-4">Fun mini-games will be available here soon 🎮</p>
    </motion.div>
  );
}
