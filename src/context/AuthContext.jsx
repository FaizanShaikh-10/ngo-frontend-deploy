// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // We'll need axios later for logout

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken')); // Load token from localStorage initially
  const [user, setUser] = useState(null); // Optional: Store user details if needed later

  useEffect(() => {
    // If we have a token, we could potentially fetch user details here
    // For now, just having the token means the user is "logged in"
    if (token) {
      // You might want to verify the token with the backend here in a real app
      // For simplicity, we assume the token is valid if it exists
      // You could decode a JWT token to get user info if you switch to JWT later
      setUser({ username: 'Admin' }); // Placeholder user object
    } else {
      setUser(null);
    }
    // Set axios default header (optional but convenient)
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Function to handle login (called from LoginPage)
  const loginAction = (newToken) => {
    localStorage.setItem('authToken', newToken); // Save token to localStorage
    setToken(newToken);
    // User state will update via useEffect
  };

  // Function to handle logout
  const logoutAction = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    setToken(null);
    setUser(null);
    // --- Optional: Call backend logout endpoint ---
    // You might want to invalidate the token on the server too
    // try {
    //   await axios.post('http://127.0.0.1:8000/api/logout/'); // We'll create this later
    // } catch (error) {
    //   console.error("Error logging out on server:", error);
    // }
    // Redirect to login page (can be done here or in Header component)
    window.location.href = '/login'; // Simple redirect for now
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