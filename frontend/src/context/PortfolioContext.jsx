import { createContext, useContext, useEffect, useState } from 'react';
import { getProjects, getTrainings } from '../services/portfolioService';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching portfolio data from API...');
      
      const [projectsData, trainingsData] = await Promise.all([
        getProjects().catch(err => {
          console.warn('Failed to fetch projects:', err);
          return [];
        }),
        getTrainings().catch(err => {
          console.warn('Failed to fetch trainings:', err);
          return [];
        })
      ]);
      
      setProjects(projectsData || []);
      setTrainings(trainingsData || []);
      setError(null);
    } catch (err) {
      console.error('Error in fetchData:', err);
      setError(err.message || 'Failed to fetch data');
      // Still load page even if data fetch fails
      setProjects([]);
      setTrainings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ 
      projects, 
      trainings, 
      loading, 
      error,
      refresh: fetchData
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);