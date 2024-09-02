// src/components/AddRoutineDialog.js

import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Box
} from '@mui/material';

const AddRoutineDialog = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    const newRoutine = {
      name,
      description
    };
    onAdd(newRoutine);
    setName('');
    setDescription('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Routine</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new routine, please enter the name and description of the routine here.
        </DialogContentText>
        <Box sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Routine Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Routine Description"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mt: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleAdd} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoutineDialog;
