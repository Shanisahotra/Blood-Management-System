import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const handleDelete = async (id) => {
    try {
      // Send delete request to the backend API
      await axios.delete(`http://localhost:3100/donors/${id}`);
      // Update the state to remove the deleted donor
      setDonors(donors.filter(donor => donor._id !== id));
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <h2>Donors</h2>
          <tr>
            <th>S. No.</th>
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
            <tr key={donor._id}>
              <td>{index + 1}</td>
              <td>{donor.name}</td>
              <td>{donor.age}</td>
              <td>{donor.bloodGroup}</td>
              <td>{donor.unit}</td>
              <td>{donor.disease}</td>
              <td>
                <button onClick={() => handleDelete(donor._id)}>Delete</button>
                <Link to={`/update/${donor._id}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeSidebar;
