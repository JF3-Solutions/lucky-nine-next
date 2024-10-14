import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Agregar token de autorización si existe
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Manejo de errores de autenticación
      console.error('No autorizado, redirigir al login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
