import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
        <button onClick={() => navigate('/hr')}>Employee HR</button>
        <button onClick={() => navigate('/finance')}>Finance</button>
        <button onClick={() => navigate('/project')}>Project</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
