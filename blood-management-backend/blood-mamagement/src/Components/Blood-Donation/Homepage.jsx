import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.css'; // Import your CSS file for styling

const Homepage = () => {
  const [bloodGroups, setBloodGroups] = useState([]);

  useEffect(() => {
    // Fetch blood donor data from the backend API
    axios.get('http://localhost:3100/donor')
      .then(response => {
        // Calculate the sum of quantities for each blood group
        const quantities = response.data.reduce((acc, donor) => {
          acc[donor.bloodGroup] = (acc[donor.bloodGroup] || 0) + 1;
          return acc;
        }, {});
        // Convert quantities object into an array of blood groups and quantities
        const bloodGroupQuantities = Object.entries(quantities);
        setBloodGroups(bloodGroupQuantities);
      })
      .catch(error => {
        console.error('Error fetching blood donor data:', error);
      });
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1>Blood Group Quantities</h1>
        <div className="blood-group-cards">
          {bloodGroups.map(([bloodGroup, quantity]) => (
            <div key={bloodGroup} className="blood-group-card">
              <h2>{bloodGroup}</h2>
              <p>Quantity: {quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
