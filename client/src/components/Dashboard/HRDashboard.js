import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserManagement from '../UserManagement';

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);

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
  );
};

export default HRDashboard;
