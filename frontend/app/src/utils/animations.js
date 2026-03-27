/**
 * Animation Variants - Reusable Framer Motion variants
 * For consistent animations across all components
 */

export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const cardVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

export const textRevealVariants = {
  hidden: { opacity: 0, y: 10 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1
    }
  })
};

export const navbarVariants = {
  hidden: { y: -100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const pulseVariants = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(0, 234, 255, 0.4)",
      "0 0 0 20px rgba(0, 234, 255, 0)"
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity
    }
  }
};

export const spinVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

/**
 * Transition presets for common use cases
 */
export const transitions = {
  smooth: { duration: 0.3, ease: "easeInOut" },
  fast: { duration: 0.2, ease: "easeInOut" },
  slow: { duration: 0.6, ease: "easeInOut" }
};
