import React, { useEffect, useState} from 'react';

import { BrowserRouter, Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Nothing from './pages/Nothing';
import Background from './pages/Background';
import Today from './pages/Today';
import Calendar from './pages/Calendar';



{/*locks the screen and hides the scroll bars */}
const ScrollHandler = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/background') {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowX = 'auto';
      document.body.style.overflowY = 'auto';
    }
  }, [location]);
  return <React.Fragment>{children}</React.Fragment>;
};




function App() {


  const [showNav, setShowNav] = useState(true);
  let timeoutId;

  const handleMouseMove = () => {
    setShowNav(true);

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      setShowNav(false);
    } , 3000);
  };


  {/*handles the self-hiding nav bar */}
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  {/*handles the keyboard navigation */}
  const KeyNavigation = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        switch (event.key) {
          case '1':
            navigate('/');
            break;
          case '2':
            navigate('/today');
            break;
          case '3':
            navigate('/calendar');
            break;
          case '4':
            navigate('/about');
            break;
          case '5':
            navigate('/background');
            break;
          default:
            break;
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [navigate]);

  };

  return (
    <BrowserRouter>
      <div className="App" onMouseMove={handleMouseMove}>
        <KeyNavigation/>
        
        <div className='content'>
          <ScrollHandler>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/today" element={<Today/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
                <Route path="/about" element={<About/>} />
                <Route path="/background" element={<Background/>}/>
                <Route path="/*" element={<Nothing/>} />
            </Routes>
            </ScrollHandler>
        </div>

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
                <Link to ="/background">Background</Link>
              </li>
            </ul>
          </nav>
        )}

      </div>
    </BrowserRouter>
  )
}

export default App