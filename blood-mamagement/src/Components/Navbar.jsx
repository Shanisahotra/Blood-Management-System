import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="admin-icon">Blood Management System</Link>
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
