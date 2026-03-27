import { motion } from "framer-motion";
import { FaArrowDown, FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import PageWrapper from "../components/PageWrapper";
import { containerVariants, floatingVariants, itemVariants } from "../utils/animations";

export default function Home() {
  return (
    <PageWrapper id="home">
      <section className="min-h-screen bg-gradient-to-br from-dark via-dark-secondary to-dark flex items-center justify-center relative overflow-hidden pt-20">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="max-w-7xl w-full px-6 relative z-10">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            
            {/* Left Side - Content */}
            <motion.div className="space-y-8">
              
              {/* Greeting */}
              <motion.p 
                variants={itemVariants}
                className="text-primary font-bold text-lg tracking-widest uppercase"
              >
                👋 Hello, I'm a Passionate Developer
              </motion.p>

              {/* Title */}
              <motion.h1 
                variants={itemVariants}
                className="text-6xl md:text-7xl font-black leading-tight"
              >
                Sanjay{" "}
                <span className="gradient-text">
                  Verma
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3 text-xl md:text-2xl font-semibold"
              >
                <span className="gradient-text">Full Stack Developer</span>
                <span className="text-primary/50">•</span>
                <span className="gradient-text">Innovator</span>
                <span className="text-primary/50">•</span>
                <span className="gradient-text">Tech Enthusiast</span>
              </motion.div>

              {/* Description */}
              <motion.p 
                variants={itemVariants}
                className="text-gray-300 text-lg leading-relaxed max-w-xl"
              >
                I craft secure, scalable applications using modern technologies like Java, Spring Boot, React, and Cloud infrastructure. Specialized in full-stack development and solving complex problems.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 pt-4"
              >
                <a 
                  href="#projects"
                  className="px-8 py-4 rounded-full font-bold text-lg tracking-wide bg-gradient-to-r from-primary to-secondary text-dark shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
                >
                  Explore My Work
                  <FaArrowDown className="group-hover:translate-y-1 transition-transform" />
                </a>
                
                <a 
                  href="/Resume.pdf"
                  download
                  className="px-8 py-4 rounded-full font-bold text-lg tracking-wide border-2 border-primary text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <FaDownload />
                  Download Resume
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-6 pt-8 border-t border-white/10"
              >
                <a 
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl text-gray-400 hover:text-primary transition-all duration-300 hover:scale-125"
                >
                  <FaGithub />
                </a>
                <a 
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl text-gray-400 hover:text-secondary transition-all duration-300 hover:scale-125"
                >
                  <FaLinkedin />
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {[
                  { number: "5+", label: "Projects" },
                  { number: "10+", label: "Trainings" },
                  { number: "8+", label: "Certifications" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-black gradient-text">{stat.number}</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider mt-2">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Profile Image */}
            <motion.div 
              className="flex justify-center items-center"
              variants={itemVariants}
            >
              <motion.div
                className="relative"
                animate={floatingVariants.animate}
              >
                {/* Spinning Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin-slow blur-lg" />
                
                {/* Inner Image */}
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-dark-secondary bg-dark-secondary">
                  <img
                    src="/profile picture.jpeg"
                    alt="Sanjay Verma"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Tech Stack Floating */}
                <motion.div 
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-3 w-screen max-w-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {["React", "Spring Boot", "Java", "AWS", "Docker", "MongoDB"].map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-full text-sm font-semibold text-gray-200 backdrop-blur-md hover:border-primary/60 hover:bg-primary/30 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ y: [2, 6, 2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

      </section>
    </PageWrapper>
  );
}
