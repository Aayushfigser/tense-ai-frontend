import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const loginUser = (formData) => API.post('/auth/login', formData);
export const getEfficiency = () => API.get('/efficiency');
export const createEfficiency = (data) => API.post('/efficiency', data);
export const deleteEfficiency = (id) => API.delete(`/efficiency/${id}`);
