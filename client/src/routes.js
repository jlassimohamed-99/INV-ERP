import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import HRDashboard from './components/Dashboard/HRDashboard';
import ProjectDashboard from './components/Dashboard/ProjectDashboard';
import FinanceDashboard from './components/Dashboard/FinanceDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import RoleBasedRedirect from './components/RoleBasedRedirect';
import Login from './components/Login'; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/hr" element={<PrivateRoute><HRDashboard /></PrivateRoute>} />
        <Route path="/project" element={<PrivateRoute><ProjectDashboard /></PrivateRoute>} />
        <Route path="/finance" element={<PrivateRoute><FinanceDashboard /></PrivateRoute>} />
        <Route path="/employee" element={<PrivateRoute><EmployeeDashboard /></PrivateRoute>} />
        <Route path="/redirect" element={<RoleBasedRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
