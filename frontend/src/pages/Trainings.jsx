import { motion } from "framer-motion";

export default function Trainings() {
  const trainings = [
    "Web Development - Pahal Horizon",
    "Drone Bootcamp - 1st Year",
    "IoT Real Life Applications"
  ];

  return (
    <motion.div 
      className="p-8 text-center text-white"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6">Trainings</h1>
      <ul className="list-disc list-inside space-y-3">
        {trainings.map((train, index) => (
          <motion.li 
            key={index}
            whileHover={{ scale: 1.05 }}
          >
            {train}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
