// src/components/Login.js
import React, { useState, useContext } from 'react';
// import axiosInstance from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/v1/login/login', { emailOrPhone });
      login(response.data); // Update auth state
      alert('Login successful');
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="emailOrPhone"
        onChange={(e) => setEmailOrPhone(e.target.value)}
        placeholder="Email or Phone Number"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
