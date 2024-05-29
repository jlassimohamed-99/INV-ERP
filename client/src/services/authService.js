import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Ensure this URL matches your backend

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Get current user
const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { 'x-auth-token': token }
    });
    return response.data;
  }
  return null;
};

export default {
  register,
  login,
  getCurrentUser
};
