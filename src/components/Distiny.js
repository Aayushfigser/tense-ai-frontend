//here are simple imports 
// and Distiny.js known as add routine

import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, RadioGroup, FormControlLabel, Radio, Paper, Grid, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'; // Add date picker import
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Calendar icon import
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import axios from 'axios';

import { LocalizationProvider } from '@mui/x-date-pickers'; // Import LocalizationProvider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Import date adapter (Dayjs)
import { daDK } from '@mui/x-date-pickers/locales';

const Distiny = () => {
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState('Hourly');
  const [type, setType] = useState('Personal');
  const [helpNeeded, setHelpNeeded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // State for calendar
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    // Logic to save the routine
    try {
      const data = {goal: goal, duration: duration, type: type, selectedDate: selectedDate, takeHelp: helpNeeded}
      const token = localStorage.getItem('token');
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };  
      const response = await axios.post('http://localhost:5000/api/routines', data, config); // Changed to relative URL
      setMessage("Routine added successfully.")
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error while adding routine');

    }
  };

  const handleReEdit = () => {
    // Logic to reset fields or re-edit
    setGoal('');
    setDuration('Hourly');
    setType('Personal');
    setSelectedDate(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <Paper elevation={5} sx={{ p: 7, mt: 0 }}>
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Your Destiny
          </Typography>

          <Grid container spacing={2}>
            {/* Routine Name/Goal */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Your Goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </Grid>

            {/* Duration Selection */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                Tracking:
              </Typography>
              <RadioGroup row value={duration} onChange={(e) => setDuration(e.target.value)}>
                <FormControlLabel value="Hourly" control={<Radio />} label="Hourly" />
                <FormControlLabel value="Weekly" control={<Radio />} label="Weekly" />
                <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
              </RadioGroup>
            </Grid>

            {/* Type Selection */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                Type:
              </Typography>
              <RadioGroup row value={type} onChange={(e) => setType(e.target.value)}>
                <FormControlLabel value="Personal" control={<Radio />} label="Personal" />
                <FormControlLabel value="Family" control={<Radio />} label="Family" />
                <FormControlLabel value="Business" control={<Radio />} label="Business" />
              </RadioGroup>
            </Grid>

            {/* Date Selection (Calendar) */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                Set Date:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <IconButton>
                  <CalendarTodayIcon color="primary" />
                </IconButton> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
              </Box>
            </Grid>

            {/* Help Checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Radio checked={helpNeeded} onChange={() => setHelpNeeded(!helpNeeded)} />}
                label="Take Help"
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="secondary" onClick={handleReEdit}>
                Re-Edit
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Grid>
            {message && (
            <Typography variant="body2" color={message.includes('successful') ? 'green' : 'error'} align="center">
              {message}
            </Typography>
          )}
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Distiny;
