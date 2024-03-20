import React from 'react';
import { Link } from 'react-router-dom';
import { BiDonateBlood } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { SiGnuprivacyguard } from "react-icons/si";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
        <BiDonateBlood />
        <Link to="/" className="admin-icon">Blood Management System</Link>
        </div>
        <div>
        
        <Link to="/register" className="admin-icon"> <SiGnuprivacyguard />Register</Link>
       
        <Link to="/login" className="admin-icon"> <FiLogIn />Login</Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
