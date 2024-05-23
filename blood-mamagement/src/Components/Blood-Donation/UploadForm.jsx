import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:3100/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
      // You can handle success response here, such as showing a success message
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file');
      // You can handle error response here, such as showing an error message to the user
    }
  };

  return (
    <div>
      <h2>Blood Donation Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadForm ;
