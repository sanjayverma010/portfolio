import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.div 
      className="p-8 text-center text-white"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
      <form className="max-w-md mx-auto space-y-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          className="w-full p-2 rounded-lg text-black"
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          className="w-full p-2 rounded-lg text-black"
        />
        <textarea 
          placeholder="Your Message" 
          className="w-full p-2 rounded-lg text-black"
        ></textarea>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="bg-green-500 px-6 py-2 rounded-lg shadow-lg"
        >
          Send
        </motion.button>
      </form>
    </motion.div>
  );
}
