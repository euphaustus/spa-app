import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { logout } from '../services/auth';

function LogoutButton() {
  const { logout: logoutContext } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      logoutContext();
      console.log('Logout successful from LogoutButton.');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;