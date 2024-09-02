// src/components/NavigationBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import logo from '../assets/logo.png'; // Adjust the path as necessary

const NavigationBar = () => {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #000000, #434343)' }}>
      <Toolbar>
        <Box
          component="img"
          sx={{
            height: 70, // Adjust the height as necessary
            marginRight: 0,
          }}
          alt="Tense AI Logo"
          src={logo}
        />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/past"
          sx={{ color: '#D3D3D3' }} // Mild white color
        >
          Past
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/present"
          sx={{ color: '#D3D3D3' }} // Mild white color
        >
          Present
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/future"
          sx={{ color: '#D3D3D3' }} // Mild white color
        >
          Future
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
