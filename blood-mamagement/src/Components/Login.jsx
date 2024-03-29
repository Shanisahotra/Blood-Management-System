// LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import CSS file for styling
import Sidebar from './Sidebar'; // Import Sidebar component

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3100/login', { email, password });
      const userData = response.data;
      console.log('Response from login API:', userData);
  
      const storedUserData = JSON.parse(localStorage.getItem('user'));
      console.log('Stored user data from localStorage:', storedUserData);
  
      if (storedUserData && email === storedUserData.email && password === storedUserData.password) {
        localStorage.setItem('user1', JSON.stringify(userData));
        setIsLoggedIn(true);
        console.log('Login successful');
      } else {
        setError('Invalid email or password');
        console.log('Login failed: Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during login');
      console.error('Error during login:', error);
    }
    if(isLoggedIn){
      return <Sidebar/>
    }
  };

  return (
    <div className='main1-login'>
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="login-button1">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
