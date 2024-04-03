// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import Sidebar from './Components/Sidebar';
import BloodDonation from './Components/Blood-Donation/BloodDonation';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blood-donation/*" element={<BloodDonationLayout />} />
      </Routes>
    </Router>
  );
}

export default App;

function BloodDonationLayout() {
  return (
    <>
      <Sidebar />
      <BloodDonation />
    </>
  );
}
