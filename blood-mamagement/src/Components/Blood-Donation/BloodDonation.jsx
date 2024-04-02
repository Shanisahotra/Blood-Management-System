import React from 'react'
import './BloodDonation.css'; // Import CSS file for styling
function BloodDonation() {
  return (
    <div>
      <div className="login-form-container">
        <h2>Blood Donation</h2>
        <form className="login-form">
          
          <div className="form-group">
            <label htmlFor="text">Name:</label>
            <input type="text" id="name"/>
          </div>
          
          <div className="form-group">
            <label htmlFor="text">Age:</label>
            <input type="text" id="text"/>
          </div>
               <div className="form-group">
  <label htmlFor="blood-group">Blood Group:</label>
  <br />
  <select id="blood-group">
    <option value="">Select Blood Group</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
  </select>
</div>
          <div className="form-group">
            <label htmlFor="email">Unit(in ml):</label>
            <input type="email" id="email"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Disease (if any):</label>
            <input type="password" id="password"/>
          </div>
          <button type="submit" className="login-button1">Donate</button>
        </form>
        
      </div>
    </div>
  )
}

export default BloodDonation;