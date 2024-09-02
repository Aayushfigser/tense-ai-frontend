import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';

const Gamification = ({ userId }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/points?userId=${userId}`)
      .then(response => {
        setPoints(response.data.points);
      })
      .catch(error => {
        console.error('Error fetching user points:', error);
      });
  }, [userId]);

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h5">Your Points</Typography>
        <Box mt={3}>
          <Typography variant="h6">{points} Points</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Gamification;
