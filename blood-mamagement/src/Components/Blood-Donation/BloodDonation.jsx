// BloodDonation.js
import React from 'react';
import Sidebar from '../Sidebar'; // Import the Sidebar component
import './BloodDonation.css'; // Import CSS file for styling

function BloodDonation() {
  return (
    <div>
      <Sidebar /> {/* Render the Sidebar component */}
      <div className="login-form-container">
       <form className="login-form">
        <h2>Blood Donation</h2>
          <div className="form-group">
            <label htmlFor="text">Name:</label>
            <input className='blood-donation' type="text" id="name"/>
          </div>
          <div className="form-group">
            <label htmlFor="number">Age:</label>
            <input className='blood-donation' type="number" id="number"/>
          </div>
          <div className="form-group">
            <label htmlFor="blood-group">Blood Group:</label>
            <br />
            <select id="blood-group" className='blood-donation1'>
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
            <label htmlFor="text">Unit(in ml):</label>
            <input className='blood-donation' type="text" id="text"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Disease (if any):</label>
            <input className='blood-donation' type="password" id="password"/>
          </div>
          <button type="submit" className="login-button1">Donate</button>
        </form>
      </div>
    </div>
  );
}

export default BloodDonation;
