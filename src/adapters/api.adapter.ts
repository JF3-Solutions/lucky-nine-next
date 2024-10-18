import axios, { type AxiosInstance } from 'axios';

const apiAdapter: AxiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3008/ws/',
});
export default apiAdapter;
