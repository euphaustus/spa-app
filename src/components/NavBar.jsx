import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth } from '../contexts/AuthContext';

function NavBar({protectedRoutes}) {
  const [showNav, setShowNav] = useState(true);
  let timeoutId;
  const { isLoggedIn } = useAuth(); // Get isLoggedIn state from AuthContext!
  const { logout: logoutContext } = useAuth();
  const location = useLocation();

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
              <Link to="/today"
                className={location.pathname === '/today' ? 'active' : ''}
                style={!isLoggedIn && protectedRoutes.includes('/today') ? { opacity: 0.5, pointerEvents: 'none', color: 'grey' } : {}}
              >Today</Link>
            </li>
            <li>
              <Link to="/calendar"
              className={location.pathname === '/calendar' ? 'active' : ''}
              style={!isLoggedIn && protectedRoutes.includes('/calendar') ? { opacity: 0.5, pointerEvents: 'none', color: 'grey' } : {}}
              >Calendar</Link>
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