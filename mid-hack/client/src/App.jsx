import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}