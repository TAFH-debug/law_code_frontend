import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000"
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});