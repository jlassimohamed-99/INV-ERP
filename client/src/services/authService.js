import axios from 'axios';

const authService = {

  login: async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      return { user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      return { user };
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
};

export default authService;
