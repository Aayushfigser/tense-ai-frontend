// src/components/RequestPasswordReset.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/request-password-reset', { email });
      alert('Password reset request sent!');
    } catch (error) {
      console.error('Failed to request password reset:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Request Password Reset</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Request Password Reset
        </Button>
      </form>
    </Container>
  );
};

export default RequestPasswordReset;
