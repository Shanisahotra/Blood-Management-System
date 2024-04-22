import React from 'react';
import './Sidebar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import { BiDonateHeart } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="sidebar"> 
      <ul className="sidebar-menu">
      <li>
          <Link to='/homepage' >
            <FaHome className="sidebar-Icon" />
            <span className="sidebar-text">Home-Page</span>
          </Link>
        </li>
        <li>
          <Link to='/home' >
            <FaHome className="sidebar-Icon" />
            <span className="sidebar-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to='/blood-donation'>
            <BiSolidDonateBlood className="sidebar-Icon"/>
            <span className="sidebar-text">Blood Donation</span>
          </Link>
        </li>
        <li><Link to=''><BiDonateHeart className="sidebar-Icon"/>
            <span className="sidebar-text">UploadForm</span> </Link>
        </li>
        <li><Link to=''><BiDonateHeart className="sidebar-Icon"/>
            <span className="sidebar-text">Donations</span> </Link>
        </li>
        <li><Link to=''><BiDonateHeart className="sidebar-Icon"/>
            <span className="sidebar-text">Donations</span> </Link>
        </li>
        <li><Link to=''><BiDonateHeart className="sidebar-Icon"/>
            <span className="sidebar-text">Donations</span> </Link>
        </li>
      </ul>
    </div>
    
  );
};

export default Sidebar;