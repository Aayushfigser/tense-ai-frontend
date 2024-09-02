// src/theme/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6AB7F8',
    },
    secondary: {
      main: '#0B72B9',
    },
    background: {
      default: '#F5F5F5',
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#4A4A4A',
    },
  },
  typography: {
    fontFamily: 'Roboto, Open Sans, sans-serif',
    h1: {
      fontSize: '32px',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '24px',
      fontWeight: '600',
    },
    h3: {
      fontSize: '20px',
      fontWeight: '600',
    },
    body1: {
      fontSize: '16px',
      fontWeight: '400',
    },
    body2: {
      fontSize: '14px',
      fontWeight: '400',
    },
    button: {
      fontSize: '16px',
      fontWeight: '500',
    },
  },
});

export default theme;
