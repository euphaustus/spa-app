// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { login } from '../services/auth'; // Import your login service

import {useAuth} from '../contexts/AuthContext';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login: loginContext } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const userData = await login(username, password);
      console.log('Login successful in LoginForm!', userData);
      localStorage.setItem('authToken', userData.token); // Still keep localStorage for persistence (optional, or context only)
      loginContext(userData.token); // **Update AuthContext state on login!**
      // ... (Consider redirecting or other UI updates)
    } catch (loginError) {
      setError(loginError.message);
      console.error('Login failed in LoginForm:', loginError);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-username">Username:</label>
          <input
            type="text"
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;