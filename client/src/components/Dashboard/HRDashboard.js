import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserManagement from '../UserManagement';
import LeftNav from '../LeftNav/LeftNav';
import MainSection from '../MainSection/MainSection';
import TopNav from '../TopNav/TopNav';
import '../../App.css'; // Assurez-vous que le chemin vers App.css est correct

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setEmployees(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="App">
      <TopNav />
      <LeftNav employeeId={employeeId} />
      <MainSection setEmployeeId={setEmployeeId} />
      <div>
        <h2>HR Dashboard</h2>
        <UserManagement />
        <h3>Employee List</h3>
        <ul>
          {employees.map(employee => (
            <li key={employee._id}>{employee.name} - {employee.role}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HRDashboard;
