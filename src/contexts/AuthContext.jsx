// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(); // Create the context

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => { // Initialize from localStorage
    return !!localStorage.getItem('authToken'); // Check if token exists on initial load
  });


  const loginContext = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  // Function to handle logout and update context
  const logoutContext = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Optional: You could add logic here to verify the token on app load
    // (e.g., make an API call to check if the token is still valid).
    // For this example, we're just relying on token presence in localStorage.
  }, []); // Run only once on component mount

  const authContextValue = {
    isLoggedIn,
    login: loginContext,
    logout: logoutContext,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}


function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthContext, AuthProvider, useAuth };