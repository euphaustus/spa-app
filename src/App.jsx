import React, { useEffect } from 'react';

import { BrowserRouter, Link, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Nothing from './pages/Nothing';
import Background from './pages/Background';



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
  
  return (
    <BrowserRouter>
      <div className="App">
        

        <div className='content'>

          <ScrollHandler>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/background" element={<Background/>}/>
                <Route path="/*" element={<Nothing/>} />
            </Routes>
            </ScrollHandler>

        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to ="/background">Background</Link>
            </li>

          </ul>
        </nav>
        

      </div>
    </BrowserRouter>
  )
}

export default App
