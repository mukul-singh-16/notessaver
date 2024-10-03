import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, TextField, Grid } from '@mui/material';
import ExpandableCard from './ExpandableCard';
import axios from 'axios'; // Import axios for making HTTP requests

const Home = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state

  // Fetch public notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER_URL+'/api/notes'); // Replace with your API URL
      setNotes(response.data); // Assume response.data is an array of notes
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setLoading(false);
    }
  };

  // Fetch notes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="home"
    >
      <Container>
        <h2>Public Notes</h2>

        {/* Styled Single-Line Search Bar */}
        <TextField
          label="Search Notes"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 2,
            bgcolor: 'transparent',
            '& .MuiOutlinedInput-root': {
              border: 'none',
              '& fieldset': {
                display: 'none',
              },
              '&:hover fieldset': {
                display: 'none',
              },
              '&.Mui-focused fieldset': {
                display: 'none',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#888',
              '&.Mui-focused': {
                color: '#6200ea',
              },
            },
            '& input': {
              padding: '10px 0',
              borderBottom: '2px solid #6200ea',
            },
          }}
        />

        {loading ? (
          <p>Loading notes...</p>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {filteredNotes.map((note, index) => (
              <Grid item key={note._id || note.id}>
                <ExpandableCard
                  title={note.title}
                  content={note.content}
                  isExpanded={expandedCard === index}
                  onClick={() => handleCardClick(index)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </motion.div>
  );
};

export default Home;
