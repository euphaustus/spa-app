// src/components/LogoutButton.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'; // Corrected import extension to .jsx!
import { logout } from '../services/auth'; // **Import the `logout` service function!**

function LogoutButton() {
  const { logout: logoutContext } = useAuth(); // Get logout function from context!

  const handleLogout = async () => {
    try {
      await logout(); // **Now calling the imported `logout` service function!**
      logoutContext(); // Update AuthContext state on logout!
      console.log('Logout successful from LogoutButton.');
      // ...
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;