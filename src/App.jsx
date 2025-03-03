import React, { useEffect, useState} from 'react';

import { BrowserRouter, Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Nothing from './pages/Nothing';
import Background from './pages/Background';
import Today from './pages/Today';
import Calendar from './pages/Calendar';
import NavBar from './components/NavBar';
import useKeyNavigation from './hooks/useKeyNavigation';


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


  useKeyNavigation();


  return (

      <div className="App"> {/* Removed onMouseMove here */}
        <NavBar/>

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

      </div>

  )
}

export default App