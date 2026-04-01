import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaProjectDiagram, FaTimes } from "react-icons/fa";
import AnimatedCard from "../components/AnimatedCard";
import PageWrapper from "../components/PageWrapper";
import SectionTitle from "../components/SectionTitle";
import api from "../services/api";
import { containerVariants } from "../utils/animations";

const parseTech = (tech) => {
  if (!tech) return [];
  if (Array.isArray(tech)) return tech;
  return tech.split(",").map(t => t.trim()).filter(Boolean);
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/projects")
      .then(data => setProjects(data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageWrapper id="projects">
      <section className="min-h-auto py-24 px-6 md:px-12 bg-dark">
        <div className="max-w-7xl mx-auto">

          {/* Section Title */}
          <SectionTitle 
            icon={FaProjectDiagram}
            title="Featured Projects"
            subtitle="Innovative solutions and real-world applications"
            colorScheme="primary"
          />

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-400">Loading projects...</div>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && projects.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, i) => (
                <AnimatedCard 
                  key={project.id} 
                  delay={i * 0.1}
                  colorAccent="primary"
                >
                  {/* Project Image */}
                  {project.project_image && (
                    <div className="mb-4 -m-6 mb-4 rounded-t-2xl overflow-hidden h-48">
                      <img 
                        src={project.project_image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Project Title */}
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {project.description || "Project description"}
                  </p>

                  {/* Technologies */}
                  {parseTech(project.technologies).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {parseTech(project.technologies).slice(0, 3).map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {parseTech(project.technologies).length > 3 && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-gray-400">
                          +{parseTech(project.technologies).length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* View Details Button */}
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="w-full px-4 py-2 rounded-lg font-bold text-sm tracking-wide bg-gradient-to-r from-primary to-secondary text-dark hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  >
                    View Details
                  </button>
                </AnimatedCard>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && projects.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <p className="text-gray-400 text-lg">No projects found</p>
            </motion.div>
          )}

        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="card-glass max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                  <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white text-2xl transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Modal Content */}
                {selectedProject.project_image && (
                  <img 
                    src={selectedProject.project_image}
                    alt={selectedProject.title}
                    className="w-full h-80 object-cover rounded-lg mb-6"
                  />
                )}

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Technologies */}
                {parseTech(selectedProject.technologies).length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-primary mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-3">
                      {parseTech(selectedProject.technologies).map((tech, i) => (
                        <span 
                          key={i}
                          className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-primary/20 to-secondary/20 text-gray-200 border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4 pt-6 border-t border-white/10">
                  {selectedProject.github_link && (
                    <a
                      href={selectedProject.github_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-6 py-3 rounded-lg font-bold text-center bg-gradient-to-r from-primary to-secondary text-dark hover:shadow-lg transition-all"
                    >
                      GitHub
                    </a>
                  )}
                  {selectedProject.live_demo_link && (
                    <a
                      href={selectedProject.live_demo_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-6 py-3 rounded-lg font-bold text-center border-2 border-primary text-primary hover:bg-primary/10 transition-all"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>
    </PageWrapper>
  );
}
