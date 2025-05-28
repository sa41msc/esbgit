import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { DashboardDataProvider } from './services/DashboardContext';
import './App.css';

function App() {
  return (
    <DashboardDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </DashboardDataProvider>
  );
}

export default App;
