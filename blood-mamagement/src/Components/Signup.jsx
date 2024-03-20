import React from 'react'

function Signup() {
  return (
    <div>
       <div className="login-container">
      <h1>Register</h1>
      <form className="login-form" >
        {/* Add login form fields */}
        <input type="text" placeholder="Username" className="input-field" />
        <input type="email" placeholder="Email" className="input-field"  />
        <input type="password" placeholder="Password" className="input-field"/>
        <button type="submit" className="login-button">Login</button>
      </form>
    
    </div>
    </div>
  )
}

export default Signup
