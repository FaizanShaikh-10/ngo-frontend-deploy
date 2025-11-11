// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://faizan8108.pythonanywhere.com/api", // ✅ Base API URL
});

// ✅ Automatically attach token if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

// src/services/api.js
import axios from "axios";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
