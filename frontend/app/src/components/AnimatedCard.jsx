import { motion } from "framer-motion";

/**
 * AnimatedCard - Reusable animated card component
 * Features: Fade-in, hover scale, glow shadow
 */
export default function AnimatedCard({ 
  children, 
  delay = 0, 
  icon: Icon = null,
  colorAccent = "primary" 
}) {
  const accentColor = colorAccent === "primary" ? "#00eaff" : "#ff00e1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 30px ${colorAccent === "primary" ? "rgba(0,234,255,0.3)" : "rgba(255,0,225,0.3)"}`
      }}
      className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group"
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:via-secondary/5 group-hover:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {Icon && (
          <div className="text-3xl mb-4" style={{ color: accentColor }}>
            <Icon />
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
}
