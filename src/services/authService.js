import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to login a user
export const loginUser = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/users/login`, { email, password });
    localStorage.setItem('token', data.token);
    return data;
};

// Function to register a user
export const registerUser = async (name, email, password) => {
    const { data } = await axios.post(`${API_URL}/users/register`, { name, email, password });
    localStorage.setItem('token', data.token);
    return data;
};
