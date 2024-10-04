import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';  // Import the context
import axios from 'axios';

function LoginUser() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const { login } = useContext(AuthContext);  // Destructure the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the request to the backend for login
      const response = await axios.post('http://localhost:5000/v1/login/login', { emailOrPhone });

      // If login is successful, update the context with the user data
      login(response.data);

      alert('Login successful');
    } catch (error) {
      // Display error if login fails
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="emailOrPhone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          placeholder="Email or Phone Number"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginUser;
