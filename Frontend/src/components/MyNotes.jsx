import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import { Grid2 } from '@mui/material';
import Mycards from './Mycards';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import "../css/flash.css"

const MyNotes = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Flash message state
  const [flashMessage, setFlashMessage] = useState({ message: '', severity: '' });

  useEffect(() => {
    // Fetch notes from the backend
    const fetchNotes = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_URL+'/api/notes/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your JWT
          },
        });
        setNotes(response.data); // Populate notes from backend response
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []); 

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (index, event) => {
    event.stopPropagation();
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleEdit = (id, title, content) => {
    setEditingNoteId(id);
    setTitle(title);
    setContent(content);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_SERVER_URL+`/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your JWT
        },
      });
      setNotes((prevNotes) => prevNotes.filter(note => note._id !== id)); // Update state to remove the note
      setFlashMessage({ message: 'Note deleted successfully!', severity: 'success' }); 
    } catch (error) {
      console.error('Error deleting note:', error);
      setFlashMessage({ message: 'Failed to delete note.', severity: 'error' }); // Show error message
    }
  };

  const handleSave = async (id,title,content) => {
    try {
      // alert("hello")
      const response = await axios.put(
        import.meta.env.VITE_SERVER_URL+`/api/notes/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your JWT
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const updatedNote = response.data;
        setNotes(notes.map(note => (note._id === id ? updatedNote : note)));
        setFlashMessage({ message: 'Note updated successfully!', severity: 'success' }); // Show success message
      }
    } catch (error) {
      console.error('Error updating note:', error);
      setFlashMessage({ message: 'Failed to update note.', severity: 'error' }); // Show error message
    }

    setEditingNoteId(null);
    setTitle('');
    setContent('');
  };

  const handleAddNote = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL+'/api/notes/',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your JWT
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        const newNote = response.data;
        setNotes([...notes, newNote]);
        setFlashMessage({ message: 'Note added successfully!', severity: 'success' }); // Show success message
      }

      setTitle('');
      setContent('');
      setDialogOpen(false);
    } catch (error) {
      console.error('Error adding note:', error);
      setFlashMessage({ message: 'Failed to add note.', severity: 'error' }); // Show error message
    }
  };

  const handleCloseFlashMessage = () => {
    setFlashMessage({ message: '', severity: '' });
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
        <h2>My Notes</h2>

        {/* Flash Message */}
        <Snackbar
          open={!!flashMessage.message}
          autoHideDuration={3000}
          onClose={handleCloseFlashMessage}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseFlashMessage} severity={flashMessage.severity} sx={{ width: '100%' }}>
            {flashMessage.message}
          </Alert>
        </Snackbar>

        {/* Search Bar */}
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
              '& fieldset': { display: 'none' },
              '&:hover fieldset': { display: 'none' },
              '&.Mui-focused fieldset': { display: 'none' },
            },
            '& .MuiInputLabel-root': {
              color: '#888',
              '&.Mui-focused': { color: '#6200ea' },
            },
            '& input': {
              padding: '10px 0',
              borderBottom: '2px solid #6200ea',
            },
          }}
        />

        {/* Add Note Button */}
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling when clicking the Add Note button
            setDialogOpen(true);
          }}
          style={{ marginBottom: '20px' }}
        >
          Add Note
        </Button>

        <Grid2 container spacing={2} justifyContent="center">
          {filteredNotes.map((note, index) => (
            <Grid2 item key={note._id}>
              <Mycards
                id={note._id}
                title={note.title}
                content={note.content}
                isExpanded={expandedCard === index}
                onClick={(event) => handleCardClick(index, event)}
                isEditing={editingNoteId === note._id}
                setTitle={setTitle}
                setContent={setContent}
                onDelete={() => handleDelete(note._id)}
                onEdit={() => handleEdit(note._id, note.title, note.content)}
                onSave={(newtitle,newcontent) => handleSave(note._id,newtitle,newcontent)}
              />
            </Grid2>
          ))}
        </Grid2>

        {/* Add Note Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={(e) => {
            e.stopPropagation(); // Prevent bubbling on closing the dialog
            setDialogOpen(false);
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Add Note</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Note Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              onClick={(e) => e.stopPropagation()}
              style={{ height: '200px', marginTop: '16px' }}
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent bubbling when clicking Cancel
                setDialogOpen(false);
              }}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent bubbling when clicking Add Note
                handleAddNote();
              }}
              color="primary"
            >
              Add Note
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </motion.div>
  );
};

export default MyNotes;
