import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios.js';
import Logo from '../components/Logo';

function HomePage() {
  const [credentials, setCredentials] = useState({ universityId: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting credentials: ", credentials);
    try {
      const response = await axios.post('/auth/login', credentials);
      console.log("Response Data: ", response.data);
      localStorage.setItem('token', response.data.token);
      console.log("SUCESS");
      navigate('/dashboard');
    } catch (err) {
      console.error("Error: ", err);
      setError(err.response ? err.response.data : 'An error occurred');
    }
  };

  return (
    <div className="homepage">
      <Logo />
      <div className="login-container">
        <h2>Welcome to the Maintenance System</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="universityId"
            value={credentials.universityId}
            onChange={handleChange}
            placeholder="Enter University ID"
            required
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
