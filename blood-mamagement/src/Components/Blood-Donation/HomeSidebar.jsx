import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomeSidebar.css';

const HomeSidebar = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch donor data from the backend API
    axios.get('http://localhost:3100/donor')
      .then(response => {
        // Check if response data is an array
        if (Array.isArray(response.data)) {
          // Set the donor data in state
          setDonors(response.data);
          setSearchResults(response.data);
        } else {
          // If response data is not an array, log an error
          console.error('Error: Expected array, received', typeof response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching donor data:', error);
      });
  }, []); // Run once when component mounts

  // Filter donors based on search term
  useEffect(() => {
    const filteredDonors = donors.filter(donor =>
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.age.toString().includes(searchTerm.toLowerCase()) ||
      donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredDonors);
  }, [searchTerm, donors]);

  const handleDelete = async (id) => {
    try {
      // Send delete request to the backend API
      await axios.delete(`http://localhost:3100/donors/${id}`);
      // Update the state to remove the deleted donor
      setDonors(donors.filter(donor => donor._id !== id));
      setSearchResults(searchResults.filter(donor => donor._id !== id));
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  const handleExport = async () => {
    try {
      // Send request to server to export data
      const response = await axios.get('http://localhost:3100/export', {
        responseType: 'blob' // Important: responseType must be 'blob' to handle binary data (Excel file)
      });

      // Create object URL for downloading the Excel file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.xlsx');
      document.body.appendChild(link);
      link.click();

      // Clean up object URL after download
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search by Name, Age, or Blood Group" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} className='serach-input'
      />
      <table>
        <thead>
          <h1>Donors</h1>
          <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Unit</th>
            <th>Disease</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((donor, index) => (
            <tr key={donor._id}>
              <td>{index + 1}</td>
              <td>{donor.name}</td>
              <td>{donor.email}</td>
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
      <button onClick={handleExport}>Export to Excel</button>
    </div>
  );
};

export default HomeSidebar;
