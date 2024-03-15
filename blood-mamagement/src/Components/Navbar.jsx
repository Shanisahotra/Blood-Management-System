import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
      <Link to="/" className="admin-icon">Blood Management System</Link>
        <Link to="/login" className="admin-icon">Admin</Link>
      
      
        
      </div>
    </nav>
  );
};

export default Navbar;
