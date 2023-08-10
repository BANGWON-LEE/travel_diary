// import './App.css';
import './styles/main.scss';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import MainPage from './pages/MainPage';
import ProjectPage from './pages/ProjectPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/project" element={<ProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
