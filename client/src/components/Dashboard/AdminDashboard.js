import React, { useState } from 'react';
import Navbar from '../Navbar';
import HRDashboard from '../Dashboard/HRDashboard';
import FinanceDashboard from '../Dashboard/FinanceDashboard';
import ProjectDashboard from '../Dashboard/ProjectDashboard';
import './AdminDashboard.css';
import LogoutButton from '../LogoutButton';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('hr');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="admin-dashboard">
      {/* <Navbar /> */}
      <div className="admin-dashboard-container">
        <div className={`sidebar `} style={{
          width: isSidebarOpen ? '250px' : '0px',
        }}>
          <button onClick={() => setIsSidebarOpen(prev=>!prev)} className="toggle-sidebar-btn">
            ☰ 
          </button>
          <ul className="sidebar-menu">
            <li><button onClick={() => setSelectedSection('hr')}>HR</button></li>
            <li><button onClick={() => setSelectedSection('finance')}>Finance</button></li>
            <li><button onClick={() => setSelectedSection('project')}>Project</button></li>
            <LogoutButton/>
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
