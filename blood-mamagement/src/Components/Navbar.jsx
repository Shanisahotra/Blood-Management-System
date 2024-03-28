import React from 'react'
import { BiDonateBlood } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file where you define custom styles
const Navbar = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const Logout = ()=>{
    localStorage.clear();
    navigate('/regiser');
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
          auth?<Link className="nav-link" to='/register' onClick={Logout}>Logout</Link>:
          <>
          <Link className="nav-link" to='/register'>Register</Link>
         <Link  className="nav-link" to='/login'>Login</Link>
          </>
        }
      </div>


      </div>
    </nav>
  )
}

export default Navbar;
