// src/api/geminiService.js
import axios from './axios';

export const getGeminiData = async () => {
  const response = await axios.get('/gemini');
  return response.data;
};
