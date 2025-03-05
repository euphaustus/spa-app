import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth(); 

  if (!isLoggedIn) {

    return <Navigate to="/" replace />;
  }


  return children;
}

export default ProtectedRoute;