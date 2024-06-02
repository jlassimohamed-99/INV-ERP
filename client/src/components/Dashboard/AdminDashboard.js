import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const goToHRDashboard = () => {
    navigate('/hr');
  };

  const goToProjectManager = () => {
    navigate('/project');
  };

  const goToFinanceDashboard = () => {
    navigate('/finance');
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <div className="dashboard-content">
        <div className="dashboard-item" onClick={goToHRDashboard} style={{ cursor: 'pointer' }}>
          <h3>Ressources Humaines</h3>
          <p>Manage HR related tasks</p>
        </div>
        <div className="dashboard-item" onClick={goToProjectManager} style={{ cursor: 'pointer' }}>
          <h3>Gestion des Projets</h3>
          <p>Manage projects</p>
        </div>
        <div className="dashboard-item" onClick={goToFinanceDashboard} style={{ cursor: 'pointer' }}>
          <h3>Comptabilité</h3>
          <p>Manage financial tasks</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
