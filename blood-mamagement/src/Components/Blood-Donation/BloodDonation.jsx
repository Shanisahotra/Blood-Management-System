import React from 'react'
import './BloodDonation.css'; // Import CSS file for styling
function BloodDonation() {
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
  )
}

export default BloodDonation
