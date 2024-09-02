import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { TextField, Button, Typography, Container, Box, Card, CardContent } from '@mui/material';
import { login } from '../services/apiService'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      console.log("Login attempt with:", { email: trimmedEmail, password: trimmedPassword });

      const response = await login({ email: trimmedEmail, password: trimmedPassword });
      console.log("Login response:", response.data);

      setAuth(response.data);
      navigate('/');
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            width: '100%',
            p: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <CardContent>
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}
            >
              Sign in
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
              >
                Sign In
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;