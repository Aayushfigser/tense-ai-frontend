// src/api/userService.js
import axios from './axios';

export const getUserProfile = async (token) => {
  const response = await axios.get('/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
