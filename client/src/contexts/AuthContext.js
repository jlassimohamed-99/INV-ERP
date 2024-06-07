import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import axios from 'axios'; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const navigateBasedOnRole = useCallback((role) => {
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'responsable rh':
        navigate('/hr');
        break;
      case 'chef de projet':
        navigate('/project');
        break;
      case 'comptable':
        navigate('/finance');
        break;
      case 'employee':
        navigate('/employee');
        break;
      default:
        navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchCurrentUser = async () => {
        try {
          const user = await authService.getCurrentUser();
          setCurrentUser(user);
          if (user) {
            navigateBasedOnRole(user.role);
          }
        } catch (error) {
          console.error('Failed to fetch current user:', error);
        }
      };
      fetchCurrentUser();
    }
  }, [navigateBasedOnRole]);

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setCurrentUser(data.user);
    } catch (error) {
      console.error('Failed to register:', error);
      throw error;
    }
  };

  const updateEmployee = async (userId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, updatedData, {
        headers: {
          'token': localStorage.getItem('token'),
        },
      });
      const updatedUser = response.data;
      if (updatedUser._id === currentUser._id) {
        setCurrentUser(updatedUser);
      }
      return updatedUser;
    } catch (error) {
      console.error('Failed to update employee:', error);
      throw error;
    }
  };

  const login = async (userData) => {
    const data = await authService.login(userData);
    setCurrentUser(data.user);
    navigateBasedOnRole(data.user.role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, updateEmployee, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
