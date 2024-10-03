import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // For navigation after login
import axios from 'axios'; // Import axios for making HTTP requests
import './auth.css'; // Import your CSS file
import { Button, Alert } from '@mui/material'; // Importing MUI Alert for flash message

const Login = () => {
  // State for email and password
  const [email, setEmail] = useState(''); // Changed from username to email
  const [password, setPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState({ message: '', type: '' }); // State for flash message
  const navigate = useNavigate(); // For navigating to different routes

  // Function to handle login form submission
  const handleLogin = async () => {
    try {
      // Sending POST request to login API
      const response = await axios.post(import.meta.env.VITE_SERVER_URL+'/api/users/login', {
        email, // Changed from username to email
        password,
      });

      // If login is successful, navigate to the home page
      if (response.status === 200) {
        setFlashMessage({ message: 'Login Successful!', type: 'success' });
        localStorage.setItem('token', response.data.token); // Store token (if provided)
        setTimeout(() => navigate('/'), 2000); // Navigate to home page after 2 seconds
      }
    } catch (error) {
      // Handle login failure
      setFlashMessage({
        message: error.response?.data?.message || 'Login failed!',
        type: 'error',
      });
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="header-form">
          <h4 className="text-primary text-center">
            <i className="fa fa-user-circle" style={{ fontSize: '110px' }}></i>
          </h4>
        </div>
        <div className="body-form">
          {/* Conditionally render flash message */}
          {flashMessage.message && (
            <Alert severity={flashMessage.type} style={{ marginBottom: '10px' }}>
              {flashMessage.message}
            </Alert>
          )}
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-envelope"></i> {/* Changed icon to envelope for email */}
                </span>
              </div>
              <input
                type="email" // Changed type to email
                className="form-control"
                placeholder="Email" // Changed placeholder to Email
                value={email} // Using email state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                required // Add required attribute
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                required // Add required attribute
              />
            </div>
            <button type="button" className="btn btn-secondary btn-block" onClick={handleLogin}>
              LOGIN
            </button>
            <div className="message">
              {/* Optionally add other links or messages */}
            </div>
          </form>
        </div>
        <div className="social">
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
