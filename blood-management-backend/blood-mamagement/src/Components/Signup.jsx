// Signup.js

import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Sign.css';

const Signup =()=> {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3100/register', {
        name,
        email,
        password
      });
      console.log('Response:', response.data);
      navigate('/login')
      //Registered data store in localstorage
      localStorage.setItem('user', JSON.stringify(response.data)); // Store registered user data in localStorage
      // Optionally, you can perform any further actions after successful submission
      setName('');
      setEmail('');
      setPassword('');
      setMessage('Registration successful');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while registering');
    }
  };

  return (
    <div>
      <div className="login-form-container">
        <h2>Signup</h2>
        <form onSubmit={collectData} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="login-button1">Signup</button>
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
