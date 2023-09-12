// import './App.css';
import './styles/main.scss';
import './styles/project.scss';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import logo from './logo.svg';
import MainPage from './pages/MainPage';
import ProjectPage from './pages/ProjectPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
