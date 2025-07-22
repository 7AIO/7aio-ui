import axios from 'axios';

export const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "/" : API_URL,
  withCredentials: true,
});

export default api;