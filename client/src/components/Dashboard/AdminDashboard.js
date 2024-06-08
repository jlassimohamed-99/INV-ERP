import React, { useState } from 'react';
import HRDashboard from './HRDashboard';
import FinanceDashboard from './FinanceDashboard';
import ProjectDashboard from './ProjectDashboard';
import KanbanBoard from '../KanbanBoard';
import './AdminDashboard.css';
import LogoutButton from '../LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDollarSign, faProjectDiagram, faBars } from '@fortawesome/free-solid-svg-icons';

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
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <button onClick={() => setIsSidebarOpen(prev => !prev)} className="toggle-sidebar-btn">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <ul className="sidebar-menu">
            <li>
              <button onClick={() => setSelectedSection('hr')}>
                <FontAwesomeIcon icon={faUser} />
                {!isSidebarOpen && <span>HR</span>}
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedSection('finance')}>
                <FontAwesomeIcon icon={faDollarSign} />
                {!isSidebarOpen && <span>Finance</span>}
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedSection('project')}>
                <FontAwesomeIcon icon={faProjectDiagram} />
                {!isSidebarOpen && <span>Project</span>}
              </button>
            </li>
          </ul>
          <LogoutButton />
        </div>
        <div className="admin-dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
