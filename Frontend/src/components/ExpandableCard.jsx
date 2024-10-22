/* eslint-disable no-undef */
// import React, { useState } from 'react';
// import { Card, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import './ExpandableCard.css';

// const ExpandableCard = ({ title, content, isExpanded, onClick }) => {
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const handleDialogOpen = () => {
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   const handleCopy = () => {
//     // Create a temporary textarea to copy the raw text
//     const tempTextArea = document.createElement('textarea');
//     tempTextArea.value = content.replace(/<p>/g, '').replace(/<\/p>/g, ''); // Remove <p> tags
//     document.body.appendChild(tempTextArea);
//     tempTextArea.select();
//     document.execCommand('copy');
//     document.body.removeChild(tempTextArea);
    
//     // Optionally, show an alert or console log to confirm
//     console.log('Raw content copied to clipboard!');
//   };

//   return (
//     <>
//       <Card
//         onClick={onClick}
//         className={`expandable-card ${isExpanded ? 'expanded' : ''}`}
//         style={{ width: '70vw', display: 'flex', flexDirection: 'row', position: 'relative', background: "#202341", color: "white" }}
//       >
//         <CardContent style={{ flex: 1 }}>
//           <Typography variant="h5">{title}</Typography>
//           {isExpanded && (
//             <Typography variant="body2" className="expanded-content" onClick={handleDialogOpen}>
//               {content.replace(/<p>/g, '').replace(/<\/p>/g, '')} {/* Displaying raw text */}
//             </Typography>
//           )}
//         </CardContent>
//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent triggering the card click
//             handleCopy();
//           }}
//           style={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
//         >
//           <ContentCopyIcon />
//         </IconButton>
//       </Card>

      
      
//     </>
//   );
// };

// export default ExpandableCard;



// import React, { useState } from 'react';
// import { Card, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import FavoriteIcon from '@mui/icons-material/Favorite'; // Heart icon
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Outlined heart icon
// import './ExpandableCard.css';
// import axios from 'axios'; // Assuming you're using axios for HTTP requests

// const ExpandableCard = ({ noteId, title, content, isExpanded, onClick, isSaved }) => {
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [saved, setSaved] = useState(isSaved); // Track if the note is saved

//   const handleDialogOpen = () => {
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(content).then(() => {
//       console.log('Content copied to clipboard!');
//     });
//   };

//   const handleSaveToggle = async () => {
//     setSaved(!saved);
//     try {
//       if (!saved) {
//         // Save the note (sending noteId to the backend)
//         await axios.post('/api/user/saveNote', { noteId });
//       } else {
//         // Unsave the note
//         await axios.post('/api/user/unsaveNote', { noteId });
//       }
//     } catch (err) {
//       console.error('Error saving/unsaving note:', err);
//     }
//   };

//   return (
//     <>
//       <Card
//         onClick={onClick}
//         className={`expandable-card ${isExpanded ? 'expanded' : ''}`}
//         style={{ width: '70vw', display: 'flex', flexDirection: 'row', position: 'relative', background: '#202341', color: 'white' }}
//       >
//         <CardContent style={{ flex: 1 }}>
//           <Typography variant="h5">{title}</Typography>
//           {isExpanded && (
//             <>
//               <Typography variant="body2" className="expanded-content" onClick={handleDialogOpen}>
//                 {content}
//               </Typography>
//             </>
//           )}
//         </CardContent>

//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation();
//             handleCopy();
//           }}
//           style={{ position: 'absolute', top: 10, right: 50, color: 'white' }}
//         >
//           <ContentCopyIcon />
//         </IconButton>

//         {/* Heart Icon for Save/Unsave */}
//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation();
//             handleSaveToggle();
//           }}
//           style={{ position: 'absolute', top: 10, right: 10, color: saved ? 'red' : 'white' }}
//         >
//           {saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//         </IconButton>
//       </Card>

//       {/* Dialog Box */}
//       <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>
//           Note Content
//           <IconButton onClick={handleCopy} style={{ position: 'absolute', top: 10, right: 10 }}>
//             <ContentCopyIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="body1" style={{ color: 'purple', fontWeight: 'bold' }}>
//             {content}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default ExpandableCard;






import { Card, CardContent, Typography, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import 'react-quill/dist/quill.snow.css';
import './ExpandableCard.css';

const ExpandableCard = ({  title, content, isExpanded, onClick }) => {
  // const [content, setcontent] = useState(content);
  

 

  // Handle Copy to Clipboard
  const handleCopy = () => {
    // Create a temporary div and assign the innerHTML to it
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
  
    // Extract the plain text by using innerText property
    const plainText = tempDiv.innerText;
  
    // Use navigator.clipboard to write the plain text to the clipboard
    navigator.clipboard.writeText(plainText).then(() => {
      console.log('Plain text copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  // Handle Save Function
  

  return (
    <Card
      // onClick={onClick}
      // className={`expandable-card ${isExpanded ? 'expanded' : ''}`}
      style={{ width: '80vw', display: 'flex', flexDirection: 'row', position: 'relative', background: "#202341", color: "white" }}
    >
      {/* <CardContent style={{ flex: 1 }}>
        {isExpanded ? (
          <>
            <Typography variant="h5">{title}</Typography>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: 'white', textAlign: 'left', lineHeight: '1.5' }}
            />
          </>
        ) : (
          <Typography variant="h5">{title}</Typography>
        )}
      </CardContent> */}

      <CardContent
      className={`expandable-card ${isExpanded ? 'expanded' : ''}`}
      style={{ flex: 1 }}>
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        <Typography variant="h5">{isExpanded ? `${title} ` : `${title} `}</Typography>
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

    </Card>
  );
};

export default ExpandableCard;

