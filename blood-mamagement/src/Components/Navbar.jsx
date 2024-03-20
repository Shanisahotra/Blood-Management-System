import React from 'react';
import { Link } from 'react-router-dom';
import { BiDonateBlood } from "react-icons/bi";

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
        <BiDonateBlood />
        <Link to="/" className="admin-icon">Blood Management System</Link>
        </div>
        {isLoggedIn ? (
          <Link to="/logout" className="admin-icon">Logout</Link>
        ) : (
          <Link to="/login" className="admin-icon">Admin</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
