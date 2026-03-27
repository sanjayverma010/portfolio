import { motion } from "framer-motion";

/**
 * SectionTitle - Reusable component for section headings with icon
 * Features: Icon display, gradient text, subtitle
 */
export default function SectionTitle({ 
  icon: Icon, 
  title, 
  subtitle,
  colorScheme = "primary"
}) {
  const colors = {
    primary: { icon: "#00eaff", text: "from-primary via-white to-secondary" },
    secondary: { icon: "#ff00e1", text: "from-secondary via-white to-primary" }
  };

  const scheme = colors[colorScheme] || colors.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      {Icon && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div 
            className="text-5xl"
            style={{ color: scheme.icon }}
          >
            <Icon />
          </div>
        </motion.div>
      )}
      
      <h1 className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${scheme.text} bg-clip-text text-transparent mb-4`}>
        {title}
      </h1>
      
      {subtitle && (
        <p 
          className="text-lg md:text-xl font-medium opacity-80"
          style={{ color: scheme.icon }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
