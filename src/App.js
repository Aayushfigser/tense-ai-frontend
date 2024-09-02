// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import BottomNavigationBar from './components/BottomNavigationBar';
import Home from './components/Home';
import CheckRoutine from './components/CheckRoutine';
import CheckEfficiency from './components/CheckEfficiency';
import Past from './components/Past';
import Present from './components/Present';
import Future from './components/Future';
import Profile from './components/Profile';

import Login from './components/Login';
import Register from './components/Register'; // Import the Register component

import RequestPasswordReset from './components/RequestPasswordReset';
import ResetPassword from './components/ResetPassword';
import { AuthProvider } from './contexts/AuthContext';
import { RoutineProvider } from './contexts/RoutineContext'; // Correctly import RoutineProvider
import './App.css';

const App = () => {
  return (
    <RoutineProvider> {/* This should now be recognized */}
      <AuthProvider>
        <Router>
          <CssBaseline />
          <NavigationBar />
          <Container sx={{ mt: 8, mb: 8 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/check-routine" element={<CheckRoutine />} />
              <Route path="/check-efficiency" element={<CheckEfficiency />} />
              <Route path="/past" element={<Past />} />
              <Route path="/present" element={<Present />} />
              
              <Route path="/future" element={<Future />} />
              <Route path="/profile" element={<Profile />} />
              
              <Route path="/request-password-reset" element={<RequestPasswordReset />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </Container>
          <BottomNavigationBar />
        </Router>
      </AuthProvider>
    </RoutineProvider>
  );
};

export default App;
