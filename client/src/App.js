import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import FinanceDashboard from './components/Dashboard/FinanceDashboard';
import HRDashboard from './components/Dashboard/HRDashboard';
import ProjectDashboard from './components/Dashboard/ProjectDashboard';
import PrivateRoute from './components/PrivateRoute';
import RoleBasedRedirect from './components/RoleBasedRedirect';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<PrivateRoute component={Register} />} />
        <Route path="/dashboard" element={<PrivateRoute component={RoleBasedRedirect} />} />
        <Route path="/admin" element={<PrivateRoute component={AdminDashboard} />} />
        <Route path="/employee" element={<PrivateRoute component={EmployeeDashboard} />} />
        <Route path="/finance" element={<PrivateRoute component={FinanceDashboard} />} />
        <Route path="/hr" element={<PrivateRoute component={HRDashboard} />} />
        <Route path="/project" element={<PrivateRoute component={ProjectDashboard} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
