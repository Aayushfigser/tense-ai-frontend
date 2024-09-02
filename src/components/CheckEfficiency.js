//checkEfficiency

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const CheckEfficiency = () => {
  const [efficiency, setEfficiency] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEfficiency();
  }, []);

  const fetchEfficiency = async () => {
    try {
      const response = await axios.get('/api/efficiency'); // Changed to relative URL
      setEfficiency(response.data);
    } catch (error) {
      console.error('Error fetching efficiency:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
          Check Your Efficiency
        </Typography>
        {efficiency ? (
          <>
            <Typography variant="body1" gutterBottom sx={{ color: 'white' }}>
              Your current efficiency is: {efficiency.percentage}%
            </Typography>
            <List>
              {efficiency.recommendations.map((recommendation, index) => (
                <ListItem key={index}>
                  <ListItemText primary={recommendation} sx={{ color: 'white' }} />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography variant="body1" gutterBottom sx={{ color: 'white' }}>
            No efficiency data available.
          </Typography>
        )}
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Re-Evaluate
        </Button>
      </Box>
    </Container>
  );
};

export default CheckEfficiency;
