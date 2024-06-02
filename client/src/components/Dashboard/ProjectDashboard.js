import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import KanbanBoard from '../KanbanBoard';

const ProjectDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <h1>Project Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
        <button onClick={() => navigate('/hr')}>Employee HR</button>
        <button onClick={() => navigate('/finance')}>Finance</button>
        <button onClick={() => navigate('/project')}>Project</button>
      </div>
      <div>
        <KanbanBoard />
      </div>
    </div>
  );
};

export default ProjectDashboard;
