import React from 'react';
import './Sidebar.css'; // Import CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>My Sidebar</h3>
      </div>
      <ul className="sidebar-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
