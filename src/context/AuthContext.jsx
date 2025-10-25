// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  // Load token from localStorage initially
  const [token, setToken] = useState(localStorage.getItem('authToken')); 
  const [user, setUser] = useState(null); 

  useEffect(() => {
    if (token) {
      // Set the default authorization header for ALL requests
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      setUser({ username: 'Admin' }); // Placeholder user object
    } else {
      // Clear the header if no token exists
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
    // Dependency array ensures this runs when 'token' changes
  }, [token]);

  // Function to handle login (called from LoginPage)
  const loginAction = (newToken) => {
    localStorage.setItem('authToken', newToken); // Save token to localStorage
    setToken(newToken);
  };

  // Function to handle logout
  const logoutAction = () => {
    // Clear the token and redirect to login page (we don't need a separate API call yet)
    localStorage.removeItem('authToken'); 
    setToken(null);
    window.location.href = '/login'; 
  };

  // The value provided to consuming components
  const contextValue = {
    token,
    user,
    isLoggedIn: !!token, // Simple check: if token exists, user is logged in
    login: loginAction,
    logout: logoutAction,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook to use the context easily
export const useAuth = () => {
  return useContext(AuthContext);
};