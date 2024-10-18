// src/services/apiService.js

import axios from 'axios';

// Base URL for the API
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Analyze past experience
export const analyzePast = async (experience) => {

  try {
    const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    };  
    const response = await apiClient.post('/past', experience, config);
    return response.data;
  } catch (error) {
    console.error('Error analyzing past experience:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Analyze present experience
export const analyzePresent = async (text) => {

  try {
    const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    };  
    const response = await apiClient.post('/present', text, config);
    return response.data;
  } catch (error) {
    console.error('Error analyzing present experience:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Analyze future possibilities
export const analyzeFuture = async (vision) => {
  
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }; 
    const response = await apiClient.post('/future', vision, config);
    return response.data;
  } catch (error) {
    console.error('Error analyzing future possibilities:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// User registration
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// User login
export const login = async (userData) => {
  try {
    const response = await apiClient.post('/auth/login', userData);
    // Handle token storage if needed
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get user profile
export const getProfile = async () => {
  try {
    const token = localStorage.getItem('authToken'); // assuming token is stored in localStorage
    const response = await apiClient.get('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Generate idea via ChatGPT
export const generateIdea = async (prompt) => {
  try {
    const response = await apiClient.post('/chatgpt/idea', { prompt });
    return response.data;
  } catch (error) {
    console.error('Error generating idea:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Exporting all functions and the apiClient as default
export default apiClient;
