import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button } from '@mui/material';

const PremiumFeature = ({ userId }) => {
  const [feature, setFeature] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/premium-feature?userId=${userId}`)
      .then(response => {
        setFeature(response.data.feature);
      })
      .catch(error => {
        setError(error.response.data.error);
      });
  }, [userId]);

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h5">Premium Feature</Typography>
        {error ? (
          <Box mt={3}>
            <Typography variant="h6">{error}</Typography>
            <Button variant="contained" color="primary">Upgrade to Premium</Button>
          </Box>
        ) : (
          <Box mt={3}>
            <Typography variant="h6">{feature}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PremiumFeature;
