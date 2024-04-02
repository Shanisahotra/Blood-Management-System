import React from 'react';
import './Sidebar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
     
      <ul className="sidebar-menu">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>Donor</Link></li>
        <li><Link to='/service'>Patient</Link></li>
        <li><Link to='/contact'>Donations</Link></li>
        <li><Link to='/about'>Blood Request</Link></li>
        <li><Link to='/service'>Request History</Link></li>
        <li><Link to='/contact'>Blood Stock</Link></li>
     
      </ul>
    </div>
  );
};

export default Sidebar;
