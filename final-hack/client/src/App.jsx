import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/check-auth', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  {console.log(user)} 
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard  user={user} />} />
        <Route path="/" element={<LandingPage  user={user} />} />
      </Routes>
    </Router>
  );
}