import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import Sidebar from './Components/Sidebar';
import BloodDonation from './Components/Blood-Donation/BloodDonation';
import HomeSidebar from './Components/Blood-Donation/HomeSidebar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Render both Sidebar and HomeSidebar on the /home route */}
        <Route path="/home" element={<HomeLayout />} />
        <Route path="/blood-donation" element={<BloodDonation />} />
      
      </Routes>
    </Router>
  );
}

const HomeLayout = () => {
  return (
    <div>
      <Sidebar />
      <HomeSidebar />
    </div>
  );
};

export default App;