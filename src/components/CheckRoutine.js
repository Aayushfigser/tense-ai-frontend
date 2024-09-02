//CheckRoutine.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, IconButton, Paper, Checkbox } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CheckRoutine = () => {
  const [routines, setRoutines] = useState([]);
  const [efficiency, setEfficiency] = useState(0);

  const fetchRoutines = async () => {
    try {
      const response = await axios.get('/api/routines'); // Changed to relative URL
      if (Array.isArray(response.data)) {
        setRoutines(response.data);
        calculateEfficiency(response.data);
      } else {
        console.error('Error: response.data is not an array');
      }
    } catch (error) {
      console.error('Error fetching routines:', error);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const calculateEfficiency = (routines) => {
    const total = routines.length;
    const completed = routines.filter((routine) => routine.completed).length;
    setEfficiency((completed / total) * 100);
  };

  const handleAddRoutine = async () => {
    try {
      const newRoutine = { name: 'New Routine', description: 'Routine description', start: new Date(), end: new Date() };
      await axios.post('/api/routines', newRoutine); // Changed to relative URL
      fetchRoutines();
    } catch (error) {
      console.error('Error adding routine:', error);
    }
  };

  const handleDeleteRoutine = async (id) => {
    try {
      await axios.delete(`/api/routines/${id}`); // Changed to relative URL
      fetchRoutines();
    } catch (error) {
      console.error('Error deleting routine:', error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      await axios.patch(`/api/routines/complete/${id}`); // Changed to relative URL
      fetchRoutines();
    } catch (error) {
      console.error('Error toggling routine completion:', error);
    }
  };

  return (
    <Container sx={{ mt: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
        Check Routine
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddRoutine}
        sx={{ mb: 2, bgcolor: '#1976d2', color: '#fff', '&:hover': { bgcolor: '#1565c0' } }}
      >
        New Habit
      </Button>
      <Paper elevation={3} sx={{ padding: 2, mb: 4, bgcolor: '#333' }}>
        <List>
          {Array.isArray(routines) &&
            routines.map((routine) => (
              <ListItem
                key={routine.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: '#444',
                  mb: 1,
                  borderRadius: 1,
                  padding: 1,
                }}
              >
                <Checkbox
                  checked={routine.completed}
                  onChange={() => handleToggleComplete(routine.id)}
                  sx={{ color: '#fff' }}
                />
                <ListItemText
                  primary={routine.name}
                  secondary={routine.description}
                  primaryTypographyProps={{ fontWeight: 'bold', color: '#fff' }}
                  secondaryTypographyProps={{ color: '#ccc' }}
                />
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRoutine(routine.id)} sx={{ color: '#f44336' }}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
        </List>
      </Paper>
      <Box sx={{ height: '500px', bgcolor: '#222', borderRadius: '8px', border: '1px solid #ddd', padding: 2 }}>
        <Calendar
          localizer={localizer}
          events={
            Array.isArray(routines)
              ? routines.map((routine) => ({
                  ...routine,
                  title: routine.name,
                  style: { backgroundColor: routine.completed ? '#4caf50' : '#1976d2', color: '#fff' },
                }))
              : []
          }
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', width: '100%', color: '#fff' }}
        />
      </Box>
      <Typography variant="h5" sx={{ mt: 3, color: '#fff' }}>
        Efficiency: {efficiency.toFixed(2)}%
      </Typography>
    </Container>
  );
};

export default CheckRoutine;
