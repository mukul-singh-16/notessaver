import { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import 'react-quill/dist/quill.snow.css';
import './ExpandableCard.css';

const ExpandableCard = ({ title, content, isExpanded, onClick }) => {
  const [flashMessage, setFlashMessage] = useState(false); // State to show flash message

  // Handle Copy to Clipboard
  const handleCopy = () => {
    // Create a temporary element to parse the rich text content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Convert HTML content to formatted plain text
    let plainText = tempDiv.innerHTML
      .replace(/<\/p>/g, '\n\n') // Replace closing </p> with double line break
      .replace(/<br\s*[\/]?>/gi, '\n') // Replace <br> tags with single line break
      .replace(/<\/li>/g, '\n') // Add line break after </li>
      .replace(/<\/?[^>]+(>|$)/g, '') // Remove all remaining HTML tags
      .replace(/^\s*[\r\n]/gm, ''); // Trim empty lines

    // Use navigator.clipboard to write the plain text to the clipboard
    navigator.clipboard.writeText(plainText).then(() => {
      console.log('Formatted text copied to clipboard');
      setFlashMessage(true); // Show flash message on successful copy
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  // Handle closing of the flash message
  const handleCloseFlashMessage = (event, reason) => {
    if (reason === 'clickaway') return;
    setFlashMessage(false);
  };

  return (
    <Card
      style={{ width: '80vw', display: 'flex', flexDirection: 'row', position: 'relative', background: "#202341", color: "white" }}
    >
      <CardContent
        className={`expandable-card ${isExpanded ? 'expanded' : ''}`}
        style={{ flex: 1 }}>
        <div onClick={onClick} style={{ cursor: 'pointer' }}>
          <Typography  style={{ color: 'white' }} variant="h5">{`${title}` }</Typography>
        </div>
        {isExpanded && (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
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

      {/* Flash Message */}
      <Snackbar
        open={flashMessage}
        autoHideDuration={3000}
        onClose={handleCloseFlashMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseFlashMessage} severity="success" sx={{ width: '100%' }}>
          Content copied to clipboard!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ExpandableCard;
