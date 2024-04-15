import React from 'react';
import './Update.css';

const Update = () => {
  return (
    <div className="update-popup">
      <h2>Update Donor Information</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" />
        </div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group:</label>
          <select id="bloodGroup" className='blood-donation'>
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
          <label htmlFor="unit">Unit (in ml):</label>
          <input type="text" id="unit" />
        </div>
        <div className="form-group">
          <label htmlFor="disease">Disease (if any):</label>
          <input type="text" id="disease" />
        </div>
        <button type="submit">Update Information</button>
      </form>
    </div>
  );
};

export default Update;
