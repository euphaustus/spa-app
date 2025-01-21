import React from 'react';

import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './app.css';
import Home from './pages/Home';
import About from './pages/About';


function App() {
  

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App
