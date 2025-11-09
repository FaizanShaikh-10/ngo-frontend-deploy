
// src/api/axios.js
import axios from "axios";

export const API_BASE_URL = "https://faizan8108.pythonanywhere.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Attach auth token automatically (if needed later)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;
