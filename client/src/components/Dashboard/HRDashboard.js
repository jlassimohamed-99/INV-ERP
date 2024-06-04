import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftNav from '../LeftNav/LeftNav';
import UserManagement from '../UserManagement';
import LogoutButton from '../LogoutButton';
import { useNavigate } from 'react-router-dom';
import './HRDashboard.css';
import AddEmployeeForm from '../AddEmployeeForm';

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFormShown , setIsFormShown ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
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

  return (
    <div className="hr-dashboard">
      <div className="top-bar">
        </div>
      <div className="main-content">
        <div className="side-content">
          <button onClick={toggleSidebar} className="toggle-sidebar-btn">
            ☰
          </button>
          {isSidebarOpen && <LeftNav selectedEmployee={selectedEmployee} />}
        </div>
        <div className="content">
          <div className="header">
            <h2 style={{
              textAlign:"center"
            }}>HR Dashboard</h2>
            {/* <button onClick={() => navigate('/admin')} className="btn">
              Retour à l'interface admin
            </button> */}
          </div>
          <div className="employee-management">
            <h3>Employee List</h3>
            <input
              type="text"
              placeholder="Search by name, email, designation etc."
              className="search-bar"
            />
            <button className="add-employee-button" onClick={()=>setIsFormShown(true)}>+ Add Employee</button>
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
     {isFormShown && <AddEmployeeForm setIsFormShown={setIsFormShown} onEmployeeAdded={()=>{}}/>}
    </div>
  );
};

export default HRDashboard;
