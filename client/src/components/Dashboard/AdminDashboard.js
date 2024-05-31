import React from 'react';
import UserManagement from '../UserManagement'; // Ensure this component handles CRUD operations

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <UserManagement />
    </div>
  );
};

export default AdminDashboard;
