import axios from 'axios';

// Centralize the API_URL to be used across the app
export const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

// Create a pre-configured instance of axios
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies are sent with every request
});

export default api;