import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          {user.role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
          {user.role === 'hr' && <Link to="/hr">HR Dashboard</Link>}
          {user.role === 'project_manager' && <Link to="/project">Project Dashboard</Link>}
          {user.role === 'finance' && <Link to="/finance">Finance Dashboard</Link>}
          {user.role === 'employee' && <Link to="/employee">Employee Dashboard</Link>}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
