import React, { useContext } from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import Profile from './Profile';

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          Welcome, {user ? user.name : 'User'}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {/* Navigate to profile section */}}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {/* Navigate to settings section */}}
            >
              Settings
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={logout}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
