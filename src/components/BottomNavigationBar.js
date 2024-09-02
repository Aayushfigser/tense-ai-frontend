// src/components/BottomNavigationBar.js

import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const BottomNavigationBar = () => {
  return (
    <BottomNavigation showLabels style={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" />
      <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} component={Link} to="/profile" />
      <BottomNavigationAction label="Ideas" icon={<LightbulbIcon />} component={Link} to="/ideas" />
    </BottomNavigation>
  );
};

export default BottomNavigationBar;
