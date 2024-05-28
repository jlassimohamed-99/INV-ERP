import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import HRDashboard from './components/Dashboard/HRDashboard';
import ProjectDashboard from './components/Dashboard/ProjectDashboard';
import FinanceDashboard from './components/Dashboard/FinanceDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="hr" element={<HRDashboard />} />
          <Route path="project" element={<ProjectDashboard />} />
          <Route path="finance" element={<FinanceDashboard />} />
          <Route path="employee" element={<EmployeeDashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
