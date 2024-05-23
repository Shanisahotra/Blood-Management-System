import React, { useState, useEffect } from 'react';
import './Update.css';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const Update = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    unit: '',
    disease: ''
  });
  const navigate = useNavigate(); // Hook to navigate to another route
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/Donors/${params.id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3100/Donors-update/${params.id}`, formData);
      console.log('Data updated successfully');
      // Navigate to HomeSidebar component after updating the data
      navigate('/home');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="update-popup">
      <h2>Update Donor Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" value={formData.age} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group:</label>
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
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit (in ml):</label>
          <input type="text" id="unit" value={formData.unit} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="disease">Disease (if any):</label>
          <input type="text" id="disease" value={formData.disease} onChange={handleChange} />
        </div>
        <button type="submit">Update Information</button>
      </form>
    </div>
  );
};

export default Update;
