import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaFolderOpen, FaGithub } from "react-icons/fa";
import AnimatedCard from "../components/AnimatedCard";
import PageWrapper from "../components/PageWrapper";
import SectionTitle from "../components/SectionTitle";
import API from "../services/api";
import { containerVariants } from "../utils/animations";

/* ================= HELPERS ================= */

const parseTech = (tech) => {
  if (!tech) return [];
  if (Array.isArray(tech)) return tech;
  return tech.split(",").map((t) => t.trim()).filter(Boolean);
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data || []))
      .catch(() => setProjects([]));
  }, []);

  return (
    <PageWrapper id="projects">
      <section className="min-h-auto py-24 px-6 md:px-12 bg-dark">
        <div className="max-w-7xl mx-auto">

          <SectionTitle
            icon={FaFolderOpen}
            title="Featured Projects"
            subtitle="Some projects built using Web Development, AI and Automation"
            colorScheme="secondary"
          />

          {projects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-xl text-gray-400">No projects available</div>
            </div>
          )}

          {/* ================= PROJECT GRID ================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {projects.map((project, index) => (
              <AnimatedCard
                key={project.id}
                delay={index * 0.1}
              >
                <div className="space-y-4">
                  {/* Project Image */}
                  {project.project_image && (
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={project.project_image}
                        alt={project.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-white line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {project.description
                      ? project.description
                      : "Project description"}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {parseTech(project.technologies).slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary
                                 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {parseTech(project.technologies).length > 3 && (
                      <span className="px-3 py-1 bg-gray-600/20 border border-gray-600/30 text-gray-400
                                     text-xs font-medium rounded-full">
                        +{parseTech(project.technologies).length - 3} more
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary
                             text-dark font-semibold rounded-lg hover:shadow-lg
                             hover:shadow-primary/30 transition-all duration-300
                             flex items-center justify-center gap-2"
                  >
                    <span>View Details</span>
                  </button>
                </div>
              </AnimatedCard>
            ))}
          </motion.div>

          {/* ================= MODAL ================= */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  className="card-glass max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-8"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text">
                      {selectedProject.title}
                    </h2>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-400 hover:text-white transition-colors text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  {/* Project Image */}
                  {selectedProject.project_image && (
                    <div className="mb-6 rounded-xl overflow-hidden">
                      <img
                        src={selectedProject.project_image}
                        alt={selectedProject.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  {/* Project Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {parseTech(selectedProject.technologies).map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary
                                   text-sm font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.github_link && (
                      <a
                        href={selectedProject.github_link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600
                                 text-white font-medium rounded-lg transition-colors duration-300"
                      >
                        <FaGithub /> GitHub
                      </a>
                    )}

                    {selectedProject.live_demo_link && (
                      <a
                        href={selectedProject.live_demo_link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary
                                 text-dark font-semibold rounded-lg hover:shadow-lg
                                 hover:shadow-primary/30 transition-all duration-300"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= LIVE DEPLOYMENTS ================= */}
          <div className="mt-20">
            <SectionTitle
              icon={FaExternalLinkAlt}
              title="Live Deployments"
              subtitle="Projects currently running in production"
              colorScheme="primary"
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Food Hunter Project */}
              <AnimatedCard delay={0.1}>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Food Hunter – Restaurant System</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Full-stack restaurant management system with order handling, billing, menu updates and customer service.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-medium rounded-full">Spring Boot</span>
                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-medium rounded-full">MySQL</span>
                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-medium rounded-full">React</span>
                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-medium rounded-full">Vercel</span>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://food-hunter-restaurant.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary
                               text-dark font-semibold rounded-lg hover:shadow-lg
                               hover:shadow-primary/30 transition-all duration-300 text-sm"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                    <a
                      href="https://github.com/sanjayverma010"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600
                               text-white font-medium rounded-lg transition-colors duration-300 text-sm"
                    >
                      <FaGithub /> GitHub
                    </a>
                  </div>
                </div>
              </AnimatedCard>

              {/* Crop Prediction Project */}
              <AnimatedCard delay={0.2}>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Crop Prediction System</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    AI-based system that predicts optimal crops using environmental and soil conditions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium rounded-full">Python</span>
                    <span className="px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium rounded-full">Machine Learning</span>
                    <span className="px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium rounded-full">Flask</span>
                    <span className="px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium rounded-full">Render</span>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://crop-prediction-1-opid.onrender.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary to-primary
                               text-dark font-semibold rounded-lg hover:shadow-lg
                               hover:shadow-secondary/30 transition-all duration-300 text-sm"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                    <a
                      href="https://github.com/sanjayverma010"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600
                               text-white font-medium rounded-lg transition-colors duration-300 text-sm"
                    >
                      <FaGithub /> GitHub
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}