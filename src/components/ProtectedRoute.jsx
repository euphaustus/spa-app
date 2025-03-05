// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { useAuth } from '../contexts/AuthContext.jsx'; // Import useAuth hook

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn from AuthContext

  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/" replace />; // 'replace' prevents going back to protected page in history
  }

  // If logged in, render the children (the protected component)
  return children;
}

export default ProtectedRoute;