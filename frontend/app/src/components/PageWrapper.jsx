import { motion } from "framer-motion";

/**
 * PageWrapper - Reusable component for page transitions and animations
 * Wraps entire page content with fade-in and slide-up animations
 */
export default function PageWrapper({ children, id }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
