import axios from 'axios';

const getBaseURL = () => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';
  return url.endsWith('/api') ? url : `${url.replace(/\/$/, '')}/api`;
};

const API = axios.create({
  baseURL: getBaseURL(),
});

// Attach token to every request automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('lmsUser') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
