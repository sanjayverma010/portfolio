import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const PortfolioContext = createContext();

// Custom hook to use the portfolio context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

// Portfolio Provider component
export const PortfolioProvider = ({ children }) => {
  // State for skills
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState(null);

  // Fetch skills data
  const fetchSkills = async () => {
    try {
      setSkillsLoading(true);
      // Mock data for now
      const mockSkills = [
        { _id: '1', name: 'Java', level: 90, category: 'Programming', icon: '🚀' },
        { _id: '2', name: 'Bash Script', level: 85, category: 'Scripting', icon: '⚛️' },
        { _id: '3', name: 'Spring-boot', level: 80, category: 'Backend', icon: '🟢' },
        { _id: '4', name: 'HTML/CSS', level: 95, category: 'Frontend', icon: '🎨' },
        { _id: '5', name: 'MySQL', level: 75, category: 'Database', icon: '🍃' },
        { _id: '6', name: 'Python', level: 70, category: 'Programming', icon: '🐍' }
      ];
      setSkills(mockSkills);
      setSkillsError(null);
    } catch (error) {
      setSkillsError(error.message);
    } finally {
      setSkillsLoading(false);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchSkills();
  }, []);

  // Context value
  const value = {
    // Skills
    skills,
    skillsLoading,
    skillsError,
    fetchSkills,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;