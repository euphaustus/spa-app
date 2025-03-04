import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth } from '../contexts/AuthContext';

function NavBar() {
  const [showNav, setShowNav] = useState(true);
  let timeoutId;
  const { isLoggedIn } = useAuth(); // Get isLoggedIn state from AuthContext!
  const { logout: logoutContext } = useAuth();

  const handleMouseMove = () => {
    setShowNav(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setShowNav(false);
    }, 3000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <div onMouseMove={handleMouseMove}> {/* Attach mousemove handler here */}
      {showNav && (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/today">Today</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/background">Background</Link>
            </li>
            {isLoggedIn && (
              <li>
                <LogoutButton/>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default NavBar;