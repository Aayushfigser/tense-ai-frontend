// src/components/ResetPassword.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/reset-password/${token}`, { password });
      alert('Password has been reset!');
      navigate('/login');
    } catch (error) {
      console.error('Failed to reset password:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Reset Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default ResetPassword;
