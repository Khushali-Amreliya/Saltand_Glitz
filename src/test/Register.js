// src/components/Register.js
import axios from 'axios';
import React, { useState } from 'react';


function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    gender: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/v1/login/create-User', formData);
      alert(response.data.message);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields */}
      <input type="text" name="firstName" onChange={handleChange} placeholder="First Name" />
      <input type="text" name="lastName" onChange={handleChange} placeholder="Last Name" />
      <input type="text" name="phoneNumber" onChange={handleChange} placeholder="Phone Number" />
      <input type="email" name="email" onChange={handleChange} placeholder="Email" />
      <select name="gender" onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
