import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

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
    const fetchCurrentUser = async () => {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        navigateBasedOnRole(user.role);
      }
    };
    fetchCurrentUser();
  }, [navigateBasedOnRole]);

  const register = async (userData) => {
    const data = await authService.register(userData);
    setCurrentUser(data.user);
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
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
