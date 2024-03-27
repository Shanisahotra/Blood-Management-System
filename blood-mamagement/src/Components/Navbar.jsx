import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { BiDonateBlood } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { SiGnuprivacyguard } from "react-icons/si";
import './Navbar.css'; // Import your CSS file where you define custom styles


const Navbar = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
   const Logout = ()=>{
    localStorage.clear();
    navigate('/register');
   
  }

   return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <BiDonateBlood className='customIcon' />
          <Link to="/" className="admin-icon">Blood Management System</Link>
        </div>
        <div className="links-container">
          {
            auth ?
            <Link to="/login" className="nav-link"><FiLogIn /> Login</Link>   
            :
            <>
            {
                auth? '':<Link to="/register" className="nav-link"><SiGnuprivacyguard /> Register</Link>
            }
              <Link className="nav-link"  onClick={Logout} >Logout</Link>
            </>
          }
             
        </div>
      </div>
    </nav>
  );
};

export default Navbar;