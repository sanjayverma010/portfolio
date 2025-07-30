import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    { name: "Portfolio Website", desc: "Personal portfolio built with React" },
    { name: "E-Commerce App", desc: "MERN stack online store" },
    { name: "Healthcare App", desc: "Android app for patient management" }
  ];

  return (
    <motion.div 
      className="p-8 text-center text-white"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6">Projects</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((proj, index) => (
          <motion.div 
            key={index}
            className="bg-purple-500 p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-bold">{proj.name}</h2>
            <p className="mt-2">{proj.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
