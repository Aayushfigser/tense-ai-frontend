// src/components/RoutinePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Avatar,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddRoutineDialog from './AddRoutineDialog'; // Ensure the correct import path

const RoutinePage = () => {
  const [routines, setRoutines] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/api/routines');
      setRoutines(response.data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/routines/${id}`);
    setRoutines((prevData) => prevData.filter((routine) => routine._id !== id));
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddRoutine = async (newRoutine) => {
    const response = await axios.post('http://localhost:5000/api/routines', newRoutine);
    setRoutines((prevData) => [...prevData, response.data]);
    handleCloseAddDialog();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Routines
        </Typography>
        <Typography variant="subtitle1">
          Manage your daily routines and stay organized.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {routines.map((routine) => (
          <Grid item xs={12} sm={6} md={4} key={routine._id}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'purple', mr: 2 }}>
                    <Typography variant="h6">{routine.name[0]}</Typography>
                  </Avatar>
                  <Typography variant="h6" component="div">
                    {routine.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {routine.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Tooltip title="Edit Routine">
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Routine">
                    <IconButton onClick={() => handleDelete(routine._id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
            onClick={handleOpenAddDialog}
          >
            <CardContent>
              <Tooltip title="Add New Routine">
                <IconButton color="primary" size="large">
                  <AddCircleIcon sx={{ fontSize: 48 }} />
                </IconButton>
              </Tooltip>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <AddRoutineDialog open={openAddDialog} onClose={handleCloseAddDialog} onAdd={handleAddRoutine} />
    </Container>
  );
};

export default RoutinePage;
