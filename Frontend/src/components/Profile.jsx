import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, TextField } from '@mui/material';
import axios from 'axios'; // Import axios to make HTTP requests
import './Profile.css'; // Ensure this file is created for styling

const Profile = () => {
  const [user, setUser] = useState({
    username: 'jhon', // Changed to username
    email: 'jhon@gmail.com',
    bio: 'i am a software developer',
    notesCount: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state

  // Function to handle getting user profile data
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.get(import.meta.env.VITE_SERVER_URL+'/api/users/getProfile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update state with the fetched profile data
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
    }
  };

  // Fetch the profile when the component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle Edit button click
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle input changes when editing the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle Save Changes button click
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.put(
        import.meta.env.VITE_SERVER_URL+'/api/users/updateProfile',
        { username: user.username, bio: user.bio }, // Updating username and bio
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );
      alert(response.data.message); // Show success message
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  // If the data is still loading, show a loading message
  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Container className="profile">
      <Typography variant="h2" gutterBottom>
        User Profile
      </Typography>
      <Card variant="outlined">
        <CardContent>
          {isEditing ? (
            <>
              <TextField
                label="Username" // Changed to Username
                name="username" // Changed to username
                value={user.username} // Changed to user.username
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={user.email}
                fullWidth
                margin="normal"
                disabled // Email is disabled (cannot be edited)
              />
              <TextField
                label="Bio"
                name="bio"
                value={user.bio}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px' }}>
                Number of Uploaded Notes: {user.notesCount}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5">{user.username}</Typography> {/* Changed to username */}
              <Typography variant="body1" color="textSecondary">
                {user.email}
              </Typography>
              <Typography variant="body2" style={{ marginTop: '10px' }}>
                {user.bio}
              </Typography>
              <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px' }}>
                Number of Uploaded Notes: {user.notesCount}
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={isEditing ? handleSave : handleEditClick}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
