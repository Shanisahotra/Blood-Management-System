import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import './BloodDonation.css';

function BloodDonation() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    unit: '',
    disease: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear previous errors and success message
    setErrors({});
    setSuccessMessage('');
    const userId = localStorage.getItem('user1')._id;
    // Check for empty fields
    const validationErrors = {};
    for (const key in formData) {
      if (!formData[key]) {
        validationErrors[key] = 'This field is required.';
      }
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Assuming you have an API endpoint for blood donation
      axios.post('http://localhost:3100/blood-donation', formData)
        .then(response => {
          // Handle response
          console.log(response);
          // Show success message
          setSuccessMessage('Donation successful!');
          // Clear form data after successful submission
          setFormData({
            name: '',
            age: '',
            bloodGroup: '',
            unit: '',
            disease: ''
          });
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Blood Donation</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input className='blood-donation' type="text" id="name" value={formData.name} onChange={handleChange}/>
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input className='blood-donation' type="number" id="age" value={formData.age} onChange={handleChange}/>
            {errors.age && <span className="error">{errors.age}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group:</label>
            <br />
            <select id="bloodGroup" className='blood-donation' value={formData.bloodGroup} onChange={handleChange}>
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
            {errors.bloodGroup && <span className="error">{errors.bloodGroup}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit (in ml):</label>
            <input className='blood-donation' type="text" id="unit" value={formData.unit} onChange={handleChange}/>
            {errors.unit && <span className="error">{errors.unit}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="disease">Disease (if any):</label>
            <input className='blood-donation' type="text" id="disease" value={formData.disease} onChange={handleChange}/>
            {errors.disease && <span className="error">{errors.disease}</span>}
          </div>
          <button type="submit" className="login-button1">Donate</button>
          <br />
          {successMessage && <div className="success">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
}

export default BloodDonation;
