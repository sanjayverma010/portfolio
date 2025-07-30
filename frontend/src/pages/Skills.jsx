import { motion } from "framer-motion";

export default function Skills() {
  const skills = ["React", "Node.js", "MongoDB", "Java", "Python"];

  return (
    <motion.div 
      className="p-8 text-center text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6">My Skills</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, index) => (
          <motion.div 
            key={index}
            className="bg-blue-500 px-6 py-3 rounded-xl shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
