// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://faizan8108.pythonanywhere.com/api",
});

// ✅ Send JWT if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
