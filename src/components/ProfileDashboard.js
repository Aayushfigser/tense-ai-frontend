import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, TextField, Button, Typography, Avatar, Grid, Divider, List, ListItem, ListItemText } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from '../context/AuthContext';
import apiClient from '../services/apiService';

const ProfileDashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: '', email: '', username: '', password: '' });
  const [message, setMessage] = useState('');
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        setMessage(error.response ? error.response.data.error : 'Failed to fetch profile');
      }
    };

    const fetchActivity = async () => {
      try {
        const response = await apiClient.get('/activity', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivity(response.data);
      } catch (error) {
        setMessage(error.response ? error.response.data.error : 'Failed to fetch activity');
      }
    };

    if (token) {
      fetchProfile();
      fetchActivity();
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiClient.put('/profile', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'Failed to update profile');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile Dashboard
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                value={profile.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                value={profile.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                value={profile.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                fullWidth
                id="password"
                label="Password"
                type="password"
                value={profile.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
          {message && <Typography variant="body2" color="error">{message}</Typography>}
        </Box>
        <Divider sx={{ width: '100%', mt: 4, mb: 2 }} />
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Recent Activity
        </Typography>
        <List>
          {activity.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.description} secondary={item.date} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ width: '100%', mt: 4, mb: 2 }} />
        <Button variant="contained" color="secondary" onClick={logout}>
          Log Out
        </Button>
      </Box>
    </Container>
  );
};

export default ProfileDashboard;
