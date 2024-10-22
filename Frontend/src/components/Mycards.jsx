import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Button, TextField, Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ExpandableCard.css';

const Mycards = ({ id, title, content, settitle, setcontent, isExpanded, onClick, isEditing, onEdit, onSave, onDelete }) => {
  const [richTextContent, setRichTextContent] = useState(content);
  const [newTitle, setNewTitle] = useState(title);
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [flashMessage, setFlashMessage] = useState(false); // Flash message state

  useEffect(() => {
    setNewTitle(title); // Set initial title when editing starts
    setRichTextContent(content); // Set initial content when editing starts
  }, [title, content]);


  



// Handle Copy to Clipboard
const handleCopy = () => {
  // Create a temporary element to parse the rich text content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;

  // Get the plain text with same formatting as displayed
  const plainText = tempDiv.innerHTML
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces with regular spaces
    .replace(/<\/p>/g, '\n\n') // Replace closing </p> with double line breaks
    .replace(/<br\s*\/?>/gi, '\n') // Replace <br> tags with single line breaks
    .replace(/<\/li>/g, '\n') // Add line break after </li>
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove all remaining HTML tags
    .replace(/\n+/g, '\n') // Normalize multiple newlines to a single newline
    .trim(); // Trim leading/trailing whitespace

  // Use navigator.clipboard to write the plain text to the clipboard
  navigator.clipboard.writeText(plainText).then(() => {
    console.log('Formatted text copied to clipboard');
    setFlashMessage(true); // Show flash message on successful copy
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
};




  



  

  const handleFlashMessageClose = () => {
    setFlashMessage(false); // Close the flash message after a few seconds
  };

  // Handle Save Function
  const handleSave = () => {
    onSave(newTitle, richTextContent); 
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setNewTitle(title); 
    setRichTextContent(content); 
    setDialogOpen(false); 
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(); // Call delete handler passed from parent
    }
  };

  return (
    <Card
      style={{ width: '80vw', display: 'flex', flexDirection: 'row', position: 'relative', background: "#202341", color: "white" }}
    >
      <CardContent
        className={`expandable-card ${isExpanded ? 'expanded' : ''}`}
        style={{ flex: 1 }}
      >
        <div onClick={onClick} style={{ cursor: 'pointer' }}>
          <Typography style={{ color: 'white' }} variant="h5">{`${title} ` }</Typography>
        </div>
        {isExpanded && (
          <div
            dangerouslySetInnerHTML={{ __html: richTextContent }}
            style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: 'white', textAlign: 'left', lineHeight: '1.5' }}
          />
        )}
      </CardContent>

      {/* Copy Button */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleCopy();
        }}
        style={{ position: 'absolute', top: 10, right: 110, color: 'white' }}
      >
        <ContentCopyIcon />
      </IconButton>

      {/* Delete Button */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        style={{ position: 'absolute', top: 10, right: 70, color: 'white' }}
      >
        <DeleteIcon />
      </IconButton>

      {/* Edit Button */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setDialogOpen(true); // Open the dialog for editing
        }}
        style={{ position: 'absolute', top: 10, right: 30, color: 'white' }}
      >
        <EditIcon />
      </IconButton>

      {/* Dialog for Editing */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <ReactQuill
            theme="snow"
            value={richTextContent}
            onChange={setRichTextContent}
            style={{ height: '200px', marginTop: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Flash Message */}
      <Snackbar
        open={flashMessage}
        autoHideDuration={2000} // Flash message will disappear after 2 seconds
        onClose={handleFlashMessageClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleFlashMessageClose} severity="success">
          Text copied to clipboard!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Mycards;
