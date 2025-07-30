import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white">
      
      {/* Profile Section */}
      <motion.img 
        src="https://via.placeholder.com/150" 
        alt="Profile"
        className="rounded-full w-40 h-40 border-4 border-yellow-400 shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Title */}
      <motion.h1 
        className="text-5xl font-bold mt-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Hi, I’m Sanjay Verma 👋
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        className="text-lg mt-3 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Full Stack Developer | Passionate about Projects, Skills & Games
      </motion.p>

      {/* Buttons */}
      <motion.div 
        className="flex gap-4 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <a href="/skills" className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-300 transition">View Skills</a>
        <a href="/projects" className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-400 transition">View Projects</a>
      </motion.div>
    </div>
  );
}
