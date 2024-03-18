import React from 'react';
import './Sidebar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
     
      <ul className="sidebar-menu">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About Us</Link></li>
        <li><Link to='/service'>Service</Link></li>
        <li><Link to='/contact'>Contact us</Link></li>
     
      </ul>
    </div>
  );
};

export default Sidebar;
