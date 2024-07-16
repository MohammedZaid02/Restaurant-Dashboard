import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import App2 from './App2';
import './index.css';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/allDishes" element={<App2 />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
