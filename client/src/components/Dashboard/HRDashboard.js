import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftNav from '../LeftNav/LeftNav';
import './HRDashboard.css';
import AddEmployeeForm from '../AddEmployeeForm';

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFormShown, setIsFormShown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/', {
          headers: {
            'token': localStorage.getItem('token'),
          },
        });
        setEmployees(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

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

  return (
    <div className="hr-dashboard">
      <div className="top-bar">
        <h2>HR Dashboard</h2>
        <button onClick={toggleSidebar} className="toggle-sidebar-btn">
          ☰
        </button>
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
              </div>
            </>
          )}
        </div>
        <div className="content">
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
        </div>
      </div>
      {isFormShown && (
        <AddEmployeeForm
          setIsFormShown={setIsFormShown}
          onEmployeeAdded={() => setIsFormShown(false)}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          selectedEmployee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default HRDashboard;
