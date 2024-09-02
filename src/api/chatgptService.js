// src/api/chatgptService.js
import axios from './axios';

export const getChatGPTData = async () => {
  const response = await axios.get('/chatgpt');
  return response.data;
};
