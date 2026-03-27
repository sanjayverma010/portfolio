import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import PageWrapper from "../components/PageWrapper";
import SectionTitle from "../components/SectionTitle";
import API from "../services/api";
import { containerVariants, itemVariants } from "../utils/animations";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/skills")
      .then(res => setSkills(res.data || []))
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <PageWrapper id="skills">
      <section className="min-h-auto py-24 px-6 md:px-12 bg-gradient-to-b from-dark to-dark-secondary">
        <div className="max-w-7xl mx-auto">

          {/* Section Title */}
          <SectionTitle 
            icon={FaCode}
            title="Technical Skills"
            subtitle="Technologies and tools I work with"
            colorScheme="primary"
          />

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-400">Loading skills...</div>
            </div>
          )}

          {/* Skills Grid */}
          {!loading && Object.keys(groupedSkills).length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-16"
            >
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <motion.div 
                  key={category}
                  variants={itemVariants}
                  className="space-y-6"
                >
                  {/* Category Title */}
                  <h3 className="text-3xl font-bold text-primary">{category}</h3>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categorySkills.map((skill, i) => (
                      <motion.div
                        key={skill.id}
                        variants={itemVariants}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="group"
                      >
                        <div className="card-glass h-full flex flex-col items-center justify-center text-center py-8">
                          {/* Skill Icon/Logo */}
                          {skill.icon ? (
                            <img 
                              src={skill.icon} 
                              alt={skill.name}
                              className="w-12 h-12 mb-4 object-contain group-hover:scale-125 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold mb-4">
                              {skill.name[0]}
                            </div>
                          )}

                          {/* Skill Name */}
                          <h4 className="font-bold text-lg text-gray-100 group-hover:gradient-text transition-all">
                            {skill.name}
                          </h4>

                          {/* Proficiency Level */}
                          {skill.proficiency && (
                            <div className="mt-3 w-full">
                              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-primary to-secondary"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.proficiency}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1 }}
                                />
                              </div>
                              <span className="text-xs text-gray-400 mt-1 block">{skill.proficiency}%</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && Object.keys(groupedSkills).length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <p className="text-gray-400 text-lg">No skills found</p>
            </motion.div>
          )}

        </div>
      </section>
    </PageWrapper>
  );
}
