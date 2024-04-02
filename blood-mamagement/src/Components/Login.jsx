import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3100/login', { email, password });
      const userData = response.data;
      const { email: userEmail, password: userPassword } = userData;

      const storedUserData = JSON.parse(localStorage.getItem('user'));
      if (storedUserData && userEmail === storedUserData.email && userPassword === storedUserData.password) {
        localStorage.setItem('user1', JSON.stringify(userData));
        setIsLoggedIn(true);
        console.log('Login successful');
        navigate('/sidebar'); // Navigate to the route where the Sidebar component is rendered
      } else {
        setError('Invalid email or password');
        console.log('Login failed: Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during login');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className={`main1-login ${isLoggedIn ? 'hidden' : ''}`}>
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
