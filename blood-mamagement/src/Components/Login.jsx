import React from 'react';
const Login = () => {

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form className="login-form">
        {/* Add login form fields */}
        <input type="text" placeholder="Username" className="input-field"/>
        <input type="password" placeholder="Password" className="input-field"/>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
