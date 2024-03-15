import Sidebar from "./Sidebar";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Example state for user authentication
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if username and password are valid (replace this with your validation logic)
    if (username === 'admin' && password === 'admin123') {
      // Redirect to dashboard if login is successful
      navigate("/sidebar");
      setIsLoggedIn(true);
    } else {
      setError('Invalid username or password');
    }
  };


  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form className="login-form" onSubmit={handleLogin}>
        {/* Add login form fields */}
        <input type="text" placeholder="Username" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {isLoggedIn && <Sidebar/>} {/* Render Dashboard component when isLoggedIn is true */}
    </div>
  );
};

export default Login;
