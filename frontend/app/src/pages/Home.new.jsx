import { motion } from "framer-motion";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import PageWrapper from "../components/PageWrapper";
import { containerVariants, floatingVariants, itemVariants } from "../utils/animations";

export default function Home() {
  return (
    <PageWrapper id="home">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-secondary to-dark pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,234,255,0.1),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,0,225,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT SIDE - Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              {/* Greeting */}
              <motion.p
                variants={itemVariants}
                className="text-primary font-medium text-lg uppercase tracking-wider opacity-80"
              >
                👋 Hello, I'm a passionate developer
              </motion.p>

              {/* Name */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
              >
                Sanjay{" "}
                <span className="gradient-text">Verma</span>
              </motion.h1>

              {/* Roles */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3 text-xl md:text-2xl font-medium"
              >
                <span className="gradient-text font-semibold">Full Stack Developer</span>
                <span className="text-primary/50">•</span>
                <span className="gradient-text font-semibold">Problem Solver</span>
                <span className="text-primary/50">•</span>
                <span className="gradient-text font-semibold">Tech Enthusiast</span>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg leading-relaxed opacity-80 max-w-2xl"
              >
                I craft secure, scalable applications using modern technologies like Java, Spring Boot, and React.
                Specialized in backend architecture, cloud solutions, and automation.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 pt-4"
              >
                <motion.a
                  href="#projects"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-dark font-bold rounded-full
                           hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Projects</span>
                </motion.a>

                <motion.a
                  href="/Resume.pdf"
                  download
                  className="px-8 py-4 border-2 border-primary text-primary font-bold rounded-full
                           hover:bg-primary hover:text-dark transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload /> Download Resume
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={itemVariants}
                className="flex gap-6 pt-8"
              >
                <motion.a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl text-gray-300 hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub />
                </motion.a>

                <motion.a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl text-gray-300 hover:text-secondary transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin />
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-8 md:gap-12 pt-12 border-t border-white/10"
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black gradient-text">5+</div>
                  <div className="text-sm opacity-70 uppercase tracking-wider mt-2">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black gradient-text">10+</div>
                  <div className="text-sm opacity-70 uppercase tracking-wider mt-2">Trainings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black gradient-text">8+</div>
                  <div className="text-sm opacity-70 uppercase tracking-wider mt-2">Certifications</div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE - Image & Tech Stack */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center space-y-8"
            >
              {/* Profile Image */}
              <motion.div
                className="relative"
                variants={floatingVariants}
                animate="animate"
              >
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-r from-primary to-secondary animate-spin-slow">
                  <div className="w-full h-full rounded-full overflow-hidden bg-dark">
                    <img
                      src="/profile picture.jpeg"
                      alt="Sanjay Verma"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-3 max-w-md"
              >
                {["React", "Spring Boot", "Java", "Cloud", "Docker", "MySQL"].map((tech, i) => (
                  <motion.span
                    key={i}
                    className="px-4 py-2 border border-primary/50 text-primary bg-primary/5 rounded-full
                             text-sm font-semibold hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
    </PageWrapper>
  );
}