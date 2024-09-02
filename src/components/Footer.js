// src/components/Footer.js

import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import RestoreIcon from '@mui/icons-material/Restore';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import FutureIcon from '@mui/icons-material/Future';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <BottomNavigation showLabels>
      



<BottomNavigationAction label="Past" icon={<RestoreIcon />} onClick={() => navigate('/past')} />
<BottomNavigationAction label="Present" icon={<PresentToAllIcon />} onClick={() => navigate('/present')} />
<BottomNavigationAction label="Future" icon={<FutureIcon />} onClick={() => navigate('/future')} />
      <BottomNavigationAction label="Discussion" icon={<ChatIcon />} onClick={() => navigate('/discussion')} />
    </BottomNavigation>
  );
};

export default Footer;
