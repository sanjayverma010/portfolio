import API from './api';

export const getProjects = async () => {
  try {
    const response = await API.get('/projects');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await API.post('/projects', projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await API.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await API.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Similar methods for trainings, skills, etc.
export const getTrainings = async () => {
  try {
    const response = await API.get('/trainings');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getSkills = async () => {
  try {
    const response = await API.get('/skills');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateSkill = async (id, skillData) => {
  try {
    const response = await API.put(`/skills/${id}`, skillData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAchievements = async () => {
  try {
    const response = await API.get('/achievements');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getGames = async () => {
  try {
    const response = await API.get('/games');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};