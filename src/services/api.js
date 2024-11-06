import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear expired token and user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Show a friendly message to the user
      alert('Your session has expired. Please log in again.');
      
      // Redirect to login page
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;
