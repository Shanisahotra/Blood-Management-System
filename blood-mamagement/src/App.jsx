import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import Sidebar from './Components/Sidebar';
import BloodDonation from './Components/Blood-Donation/BloodDonation';
import HomeSidebar from './Components/Blood-Donation/HomeSidebar';
import Update from './Components/Blood-Donation/Update';
import Homepage from './Components/Blood-Donation/Homepage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeLayout />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/homepage" element={<Homepage />} />
        
        <Route path="/blood-donation" element={<BloodDonation />} />
        <Route path="/update/:id" element={<Update />} /> {/* Route for update component */}
      </Routes>
    </Router>
  );
}

const HomeLayout = () => {
  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomeSidebar />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
