import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007BFF',
    },
    secondary: {
      main: '#6C757D',
    },
    background: {
      default: '#F8F9FA',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#C0C0C0', // Silvery color
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
