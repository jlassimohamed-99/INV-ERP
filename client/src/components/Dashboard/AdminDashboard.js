import React, { useState } from 'react';
import Navbar from '../Navbar';
import HRDashboard from '../Dashboard/HRDashboard';
import FinanceDashboard from '../Dashboard/FinanceDashboard';
import ProjectDashboard from '../Dashboard/ProjectDashboard';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('hr');

  const renderContent = () => {
    switch (selectedSection) {
      case 'hr':
        return <HRDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      case 'project':
        return <ProjectDashboard />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '10px' }}>
          <h3>Admin Dashboard</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><button onClick={() => setSelectedSection('hr')}>HR</button></li>
            <li><button onClick={() => setSelectedSection('finance')}>Finance</button></li>
            <li><button onClick={() => setSelectedSection('project')}>Project</button></li>
          </ul>
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
