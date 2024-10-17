import axios, { type AxiosInstance } from 'axios';

const publicApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3008',
});
export default publicApi;
