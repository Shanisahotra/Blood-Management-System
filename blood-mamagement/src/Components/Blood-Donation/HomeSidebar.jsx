import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeSidebar.css';
import { Link } from 'react-router-dom';

const HomeSidebar = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch donor data from the backend API
    axios.get('http://localhost:3100/donor')
      .then(response => {
        if (Array.isArray(response.data)) {
          setDonors(response.data);
          setSearchResults(response.data);
        } else {
          console.error('Error: Expected array, received', typeof response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching donor data:', error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3100/donors/${id}`);
      setDonors(donors.filter(donor => donor._id !== id));
      setSearchResults(searchResults.filter(donor => donor._id !== id));
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  const handleSearch = async (term) => {
    try {
      const response = await axios.get(`http://localhost:3100/search?q=${term}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching donors:', error);
    }
  };

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    handleSearch(term); // Call handleSearch with the updated search term
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:3100/export', {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.xlsx');
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div>
      <div className="table-container">
      <Link to='/sidebar'>Back</Link>
      <br />
      <br />
        <input
          type="text"
          placeholder="Search by Name, Age, or Blood Group"
          className="search-input"
          value={searchTerm}
          onChange={handleChange}
        />
        <table className="data-table">
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
                  <button className="operation-btn" onClick={() => handleDelete(donor._id)}>Delete</button>
                  <div className="operation-btn"><Link to={`/update/${donor._id}`}>Update</Link></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleExport}>Export to Excel</button>
       
        
      </div>
    </div>
  );
};

export default HomeSidebar;
