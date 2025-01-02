import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Snackbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { submitRating } from '../api/tmdb-api'; 

const RatePage = () => {
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  const { movieId } = useParams(); 
  const sessionId = localStorage.getItem('tmdbSessionId'); 

  const handleRatingChange = (e) => {
    const value = e.target.value;
    if (value === '' || (value >= 1 && value <= 10)) {
      setRating(value);
      setError('');
    } else {
      setError('Please enter a valid rating between 1 and 10');
    }
  };

  const handleSubmit = async () => {
    if (rating < 1 || rating > 10) {
      setError('Please enter a valid rating between 1 and 10');
      return;
    }
    if (!sessionId) {
      setError('You need to log in to submit a rating');
      return;
    }

    try {
      const response = await submitRating(movieId, rating, sessionId);
      if (response.success) {
        setSnackbarMessage('Rating submitted successfully. Thank you for your participation!');
        localStorage.setItem(`rating_${movieId}`, rating);
        setOpenSnackbar(true); 
      } else {
        setError('Failed to submit rating');
      }
    } catch (err) {
      console.error('Error submitting rating:', err);
      setError('Failed to submit rating');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); 
    navigate(`/movies/${movieId}`); 
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Rate the Movie
      </Typography>

      <TextField
        label="Rating (1-10)"
        type="number"
        value={rating}
        onChange={handleRatingChange}
        fullWidth
        error={!!error}
        helperText={error}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Submit Rating
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar} 
        message={snackbarMessage} 
      />
    </Paper>
  );
};

export default RatePage;
