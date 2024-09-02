import axios from 'axios';

export const getGeminiAnalysis = async (input) => {
  try {
    const response = await axios.post('/api/gemini', { input });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Gemini API:', error);
    throw error;
  }
};

export const getChatGPTAnalysis = async (input) => {
  try {
    const response = await axios.post('/api/chatgpt', { input });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from ChatGPT API:', error);
    throw error;
  }
};
