import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/hr">Ressources Humaines</Link></li>
        <li><Link to="/project">Gestion des Projets</Link></li>
        <li><Link to="/finance">Comptabilité</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
