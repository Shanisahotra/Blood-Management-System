import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
  })

  const collectData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3100/register', {
        name,
        email,
        password
      });
      console.log('Response:', response.data);
      //Registered data store in localstorage
       localStorage.setItem('user', JSON.stringify(response.data));
      // Optionally, you can perform any further actions after successful submission
      setName('');
      setEmail('');
      setPassword('');

      if(!name || !email || !password){
        setMessage('Please fill all fields');
      }else{
        setMessage('Registartion successfuly');
      }
     

    } catch (error) {
      console.error('Error:', error);
      // Optionally, you can handle errors here
    }

  };

  return (
    <div>
      <div className="login-container">
        <h1>Register</h1>
        <form className="login-form" onSubmit={collectData}>
          {/* Add login form fields */}
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Register</button>

          <p>{message}</p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
