import API from './api';

export const registerVisitor = async () => {
  try {
    const response = await API.post('/visitors', {
      userAgent: navigator.userAgent
    });
    return response.data;
  } catch (error) {
    console.error('Visitor registration failed:', error);
    return null;
  }
};

export const getVisitorCount = async () => {
  try {
    const response = await API.get('/visitors/count');
    return response.data.count;
  } catch (error) {
    console.error('Failed to get visitor count:', error);
    return 0;
  }
};