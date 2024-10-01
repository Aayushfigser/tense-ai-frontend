
//@bhanu Your first goal is to connect this with backend and database, then analyse the fetching logic
//Design is perfect, some logic is wrong here, the data will fetch from past, present and future. the fetching logic is developed some other freelancer..

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, IconButton, Paper, Checkbox, Tooltip } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, CalendarMonth as CalendarIcon } from '@mui/icons-material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import { fetchAIData, getEfficiencySuggestions } from './aiService'; // AI-powered logic (Mockup)


const localizer = momentLocalizer(moment);

const CheckRoutine = () => {
  const [routines, setRoutines] = useState([]);
  const [efficiency, setEfficiency] = useState(0);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const navigate = useNavigate();  // Initialize the navigate hook

  // Your state and other functions here

  const handleDistiny = () => {
    navigate('/Distiny');  // Navigate to the AddRoutine page
  };

  const fetchRoutines = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };  
      const response = await axios.get('http://localhost:5000/api/routines', config);
      if (Array.isArray(response.data)) {
        calculateEfficiency(response.data);
        return response.data
      } else {
        console.error('Error: response.data is not an array');
      }
    } catch (error) {
      console.error('Error fetching routines:', error);
    }
  };

  const fetchAISuggestions = async () => {
    try {
      const aiResponse = await fetchAIData(); // AI fetches routines based on user's browsing habits or preferences
      setAiSuggestions(aiResponse.data);
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
    }
  };

  useEffect(() => {
    fetchRoutines().then(setRoutines);
    // fetchAISuggestions().then(setAiSuggestions); 
  }, );

  const calculateEfficiency = (routines) => {
    const total = routines.length;
    const completed = routines.filter((routine) => routine.completed).length;
    setEfficiency((completed / total) * 100);
  };

  const handleAddRoutine = async () => {
    try {
      const newRoutine = { name: 'New Routine', description: 'Routine description', start: new Date(), end: new Date() };
      await axios.post('/api/routines', newRoutine);
      fetchRoutines();
    } catch (error) {
      console.error('Error adding routine:', error);
    }
  };

  const handleDeleteRoutine = async (id) => {
    try {
      await axios.delete(`/api/routines/${id}`);
      fetchRoutines();
    } catch (error) {
      console.error('Error deleting routine:', error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      await axios.patch(`/api/routines/complete/${id}`);
      fetchRoutines();
    } catch (error) {
      console.error('Error toggling routine completion:', error);
    }
  };

  const applyAISuggestions = async () => {
    const efficiencyTips = await getEfficiencySuggestions(routines); // Get AI suggestions for better routines
    setAiSuggestions(efficiencyTips);
  };

  return (
    <Container sx={{ mt: 0, color: '#f5f5f5' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
       PERFORMANCE ROUTINE
      </Typography>
      
      <Tooltip title="Add a new habit/routine based on your preferences">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleDistiny}
          sx={{ mb: 1, bgcolor: '#007BFF', color: '#fff', '&:hover': { bgcolor: '#0056b3' } }}
        >
          Add Distiny 
          
        </Button>
      </Tooltip>

      <Paper elevation={3} sx={{ padding: 2, mb: 4, bgcolor: '#333' }}>
        <List>
          {Array.isArray(routines) && routines.map((routine) => (
            <ListItem key={routine._id} sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#444', mb: 1, borderRadius: 1 }}>
              <Checkbox
                checked={routine.completed}
                onChange={() => handleToggleComplete(routine.id)}
                sx={{ color: '#fff' }}
              />
              <ListItemText
                primary={routine.goal}
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
          events={Array.isArray(routines)
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

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: '#1976d2' }}>
          Efficiency: {efficiency.toFixed(2)}%
        </Typography>

        <Typography variant="h6" sx={{ mt: 2, color: '#f5f5f5' }}>
          AI Suggestions for Efficiency:
        </Typography>

        <List>
          {aiSuggestions.length > 0 ? aiSuggestions.map((tip, index) => (
            <ListItem key={index} sx={{ color: '#ccc' }}>
              <ListItemText primary={tip} />
            </ListItem>
          )) : (
            <Typography sx={{ color: '#999' }}>No suggestions available.</Typography>
          )}
        </List>
        
        <Button
          variant="contained"
          color="secondary"
          onClick={applyAISuggestions}
          startIcon={<CalendarIcon />}
          sx={{ mt: 3 }}
        >
          Apply AI Suggestions
        </Button>
      </Box>
    </Container>
  );
};

export default CheckRoutine;

