// src/pages/DashboardPage.jsx

import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; // Import useAuth to access user info

function DashboardPage() {
  const { user } = useAuth(); // Get the current user from context

  return (
    <Container>
      <h1 className="mt-4">Dashboard</h1>
      {/* Display a welcome message if the user object exists */}
      {user ? (
        <p>Welcome, {user.username || 'Admin'}!</p>
      ) : (
        <p>You are logged in.</p>
      )}
      <p>This is your protected dashboard area.</p>
      {/* Add more dashboard content here later */}
    </Container>
  );
}

export default DashboardPage;