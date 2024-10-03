import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    alert('Logout Successful');
    navigate('/login'); // Redirect to login page
  };

  // Check if the user is logged in by checking for the token
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Notes App
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
        

        {/* Conditionally render Login or Logout button based on login status */}
        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/mynotes">My Notes</Button>
            <Button color="inherit" component={Link} to="/savednotes">Saved Notes</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
