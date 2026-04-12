import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5005/api',
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
