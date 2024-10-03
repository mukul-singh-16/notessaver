const SavedNotes = () => {
  return (
    <h1>under construction</h1>
  )
}

export default SavedNotes




// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Container, Grid, Grid2, TextField } from '@mui/material';
// import ExpandableCard from './ExpandableCard';

// const SavedNotes = () => {
//     const [expandedCard, setExpandedCard] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
  
//     const notes = [
//       { id: 1, title: 'Note Title 1', content: 'This is the expanded content for note 1.' },
//       { id: 2, title: 'Note Title 2', content: 'This is the expanded content for note 2.' },
//       { id: 3, title: 'Note Title 3', content: 'This is the expanded content for note 3.' },
//       { id: 4, title: 'Note Title 4', content: 'This is the expanded content for note 4.' },
//     ];
  
//     const filteredNotes = notes.filter(note =>
//       note.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
  
//     const handleCardClick = (index) => {
//       setExpandedCard(expandedCard === index ? null : index);
//     };
  
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5 }}
//         className="home"
//       >
//         <Container>
//           <h2>Saved Notes</h2>
  
//           {/* Styled Single-Line Search Bar */}
//           <TextField
//             label="Search Notes"
//             variant="outlined"
//             fullWidth
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{
//               mb: 2,
//               bgcolor: 'transparent', // Make background transparent
//               '& .MuiOutlinedInput-root': {
//                 border: 'none', // Remove border
//                 '& fieldset': {
//                   display: 'none', // Hide fieldset
//                 },
//                 '&:hover fieldset': {
//                   display: 'none', // Hide fieldset on hover
//                 },
//                 '&.Mui-focused fieldset': {
//                   display: 'none', // Hide fieldset when focused
//                 },
//               },
//               '& .MuiInputLabel-root': {
//                 color: '#888', // Label color
//                 '&.Mui-focused': {
//                   color: '#6200ea', // Label color when focused
//                 },
//               },
//               '& input': {
//                 padding: '10px 0', // Vertical padding
//                 borderBottom: '2px solid #6200ea', // Underline effect
//               },
//             }}
//           />
  
//           <Grid2 container spacing={2} justifyContent="center">
//             {filteredNotes.map((note, index) => (
//               <Grid2 item key={note.id}>
//                 <ExpandableCard
//                   title={note.title}
//                   content={note.content}
//                   isExpanded={expandedCard === index}
//                   onClick={() => handleCardClick(index)}
//                 />
//               </Grid2>
//             ))}
//           </Grid2>
//         </Container>
//       </motion.div>
//     );
//   };

// export default SavedNotes;
