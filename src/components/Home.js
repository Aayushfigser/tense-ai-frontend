//Home.js

import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const HomeTab = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, ); // Set timeout to 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleCheckRoutine = () => {
    navigate('/check-routine');
  };

  const handleCheckEfficiency = () => {
    navigate('/check-efficiency');
  };

  return (
    <Container className="container-bg">
      <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom className="silvery-text" sx={{ mb: 6 }}>
          Welcome to Tense Ai & Time
        </Typography>
        {showText && (
          <>
            <Typography variant="h5" component="h2" gutterBottom className="silvery-text" sx={{ mb: 4 }}>
              Make Your Own Path
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckRoutine}
              className="button-sparkle"
              sx={{ mb: 4, width: '50%', borderRadius: 2 }}
            >
              Check Routine
              <span className="sparkle"></span>
              <span className="sparkle"></span>
              <span className="sparkle"></span>
              <span className="sparkle"></span>
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckEfficiency}
              className="button-sparkle"
              sx={{ mb: 4, width: '50%', borderRadius: 2 }}
            >
              Check Efficiency
              <span className="sparkle"></span>
              <span className="sparkle"></span>
              <span className="sparkle"></span>
              <span className="sparkle"></span>
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default HomeTab;
