import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import './HRDashboard.css';
import LeftNav from '../LeftNav/LeftNav';
import AddEmployeeForm from '../AddEmployeeForm';
import { useNavigate } from 'react-router-dom';

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFormShown, setIsFormShown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showLeaveRequests, setShowLeaveRequests] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user ? user.role : null;

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/', {
        headers: {
          'token': localStorage.getItem('token'),
        },
      });
      setEmployees(response.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/conges', {
          headers: {
            'token': localStorage.getItem('token'),
          },
        });
        setLeaves(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeaves();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDeleteEmployee = async () => {
    if (selectedEmployee) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${selectedEmployee._id}`, {
          headers: {
            'token': localStorage.getItem('token'),
          },
        });
        setEmployees(employees.filter(emp => emp._id !== selectedEmployee._id));
        setSelectedEmployee(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEditEmployee = () => {
    setIsFormShown(true);
    setIsEditMode(true);
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsFormShown(true);
    setIsEditMode(false);
  };

  const handleBellClick = () => {
    setShowLeaveRequests(true);
  };

  const handleLeaveStatusChange = async (leaveId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/conges/${leaveId}`, { status }, {
        headers: {
          'token': localStorage.getItem('token'),
        },
      });
      setLeaves(leaves.map(leave => leave._id === leaveId ? { ...leave, status } : leave));
    } catch (err) {
      console.error(err);
    }
  };

  const pendingLeaves = leaves.filter(leave => leave.status === 'Pending');
  const approvedLeaves = leaves.filter(leave => leave.status === 'Approved');
  const rejectedLeaves = leaves.filter(leave => leave.status === 'Rejected');

  return (
    <div className="hr-dashboard">
      <div className="top-bar">
        <div className="left">
          <button onClick={toggleSidebar} className="toggle-sidebar-btn">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h2>HR Dashboard</h2>
        </div>
        <FontAwesomeIcon icon={faBell} className="bell-icon" onClick={handleBellClick} />
      </div>
      <div className="main-content">
        <div className={`side-content ${isSidebarOpen ? 'open' : 'closed'}`}>
          {isSidebarOpen && (
            <>
              <LeftNav selectedEmployee={selectedEmployee} />
              <div className="sidebar-buttons">
                <button onClick={handleAddEmployee}>+ Add Employee</button>
                {selectedEmployee && (
                  <>
                    <button onClick={handleEditEmployee}>Modify</button>
                    <button onClick={handleDeleteEmployee}>Delete</button>
                  </>
                )}
                {role !== 'admin' && (
                  <button onClick={handleLogout} className="logout-button">Se Déconnecter</button>
                )}
              </div>
            </>
          )}
        </div>
        <div className="content">
          {showLeaveRequests ? (
            <div className="leave-requests">
              <h2>Pending Leave Requests</h2>
              {pendingLeaves.map(leave => (
                <div key={leave._id} className="leave-request pending">
                  <p>Employee: {leave.employeeId.name} ({leave.employeeId._id})</p>
                  <p>From: {new Date(leave.startDate).toLocaleDateString()}</p>
                  <p>To: {new Date(leave.endDate).toLocaleDateString()}</p>
                  <p>Reason: {leave.reason}</p>
                  <div className="actions">
                    <button onClick={() => handleLeaveStatusChange(leave._id, 'Approved')}>Approve</button>
                    <button onClick={() => handleLeaveStatusChange(leave._id, 'Rejected')}>Reject</button>
                  </div>
                </div>
              ))}
              <h2>Approved Leave Requests</h2>
              {approvedLeaves.map(leave => (
                <div key={leave._id} className="leave-request approved">
                  <p>Employee: {leave.employeeId.name} ({leave.employeeId._id})</p>
                  <p>From: {new Date(leave.startDate).toLocaleDateString()}</p>
                  <p>To: {new Date(leave.endDate).toLocaleDateString()}</p>
                  <p>Reason: {leave.reason}</p>
                </div>
              ))}
              <h2>Rejected Leave Requests</h2>
              {rejectedLeaves.map(leave => (
                <div key={leave._id} className="leave-request rejected">
                  <p>Employee: {leave.employeeId.name} ({leave.employeeId._id})</p>
                  <p>From: {new Date(leave.startDate).toLocaleDateString()}</p>
                  <p>To: {new Date(leave.endDate).toLocaleDateString()}</p>
                  <p>Reason: {leave.reason}</p>
                </div>
              ))}
              <button className="close-btn" onClick={() => setShowLeaveRequests(false)}>Close</button>
            </div>
          ) : (
            <div className="employee-management">
              <h3>Employee List</h3>
              <div className="employee-cards">
                {employees.map((employee) => (
                  <div
                    key={employee._id}
                    className="employee-card"
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    <img src={employee.profilePicture || 'https://i.ytimg.com/vi/SSi4DmUAjBM/maxresdefault.jpg'} alt={employee.name} />
                    <div className="employee-details">
                      <h4>{employee.name}</h4>
                      <p>{employee.role}</p>
                      <footer>
                        <p>{employee.email}</p>
                      </footer>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {isFormShown && (
        <AddEmployeeForm
          setIsFormShown={setIsFormShown}
          onEmployeeAdded={fetchEmployees} // Call fetchEmployees after adding/updating an employee
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          selectedEmployee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default HRDashboard;
