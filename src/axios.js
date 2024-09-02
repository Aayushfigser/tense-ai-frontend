import axios from 'axios';



// Set the base URL for Axios
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000', // Adjust this based on your deployment environment
});

export default instance;
