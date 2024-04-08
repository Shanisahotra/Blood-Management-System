import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeSidebar.css';

const HomeSidebar = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // Fetch donor data from the backend API
    axios.get('http://localhost:3100/donor')
      .then(response => {
        // Check if response data is an array
        if (Array.isArray(response.data)) {
          // Set the donor data in state
          setDonors(response.data);
        } else {
          // If response data is not an array, log an error
          console.error('Error: Expected array, received', typeof response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching donor data:', error);
      });
  }, []); // Run once when component mounts

  return (
    <div>
      <table>
        <thead>
        <h2>Donors</h2>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Unit</th>
            <th>Disease</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, index) => (
            <tr key={index}>
              <td>{donor.name}</td>
              <td>{donor.age}</td>
              <td>{donor.bloodGroup}</td>
              <td>{donor.unit}</td>
              <td>{donor.disease}</td>
              <td><button>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeSidebar;
