import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('authToken');
  });


  const loginContext = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };


  const logoutContext = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

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