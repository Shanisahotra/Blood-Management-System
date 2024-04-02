import React from 'react'
import { BiDonateBlood } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { SiGnuprivacyguard } from "react-icons/si";
import { FiLogIn } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import './Navbar.css'; // Import your CSS file where you define custom styles

const Navbar = () => {
  const auth = localStorage.getItem('user');
  const auth1 = localStorage.getItem('user1');
  const navigate = useNavigate();

  const Logout = () => {
    // Clear only auth1 from localStorage
    // localStorage.removeItem('user');
    localStorage.removeItem('user1');
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className='navbar-container'>
        <div className="logo-container">
          <BiDonateBlood className='customIcon' />
          <Link to="/" className="admin-icon">Blood Management System</Link>
        </div>
        <div className="links-container">
          {
            auth ? "" : <Link className="nav-link" to='/register'><SiGnuprivacyguard />Register</Link>
          }
          {
            auth1 ?
              <Link className="nav-link" to='/login' onClick={Logout}><CiLogout />Logout</Link> :
              <Link className="nav-link" to='login' ><FiLogIn />Login</Link>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
