import React, { useState } from 'react';
import HRDashboard from './HRDashboard';
import FinanceDashboard from './FinanceDashboard';
import ProjectDashboard from './ProjectDashboard';
import KanbanBoard from '../KanbanBoard';
import './AdminDashboard.css';
import LogoutButton from '../LogoutButton';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('hr');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const renderContent = () => {
    if (selectedProjectId) {
      return <KanbanBoard projectId={selectedProjectId} onBackToProjects={() => setSelectedProjectId(null)} />;
    }

    switch (selectedSection) {
      case 'hr':
        return <HRDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      case 'project':
        return <ProjectDashboard onProjectClick={setSelectedProjectId} />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-container">
        <div className={`sidebar `} style={{
          width: isSidebarOpen ? '250px' : '0px',
        }}>
          <button onClick={() => setIsSidebarOpen(prev => !prev)} className="toggle-sidebar-btn">
            ☰
          </button>
          <ul className="sidebar-menu">
            <li><button onClick={() => setSelectedSection('hr')}>HR</button></li>
            <li><button onClick={() => setSelectedSection('finance')}>Finance</button></li>
            <li><button onClick={() => setSelectedSection('project')}>Project</button></li>
            <LogoutButton />
          </ul>
        </div>
        <div className="admin-dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
