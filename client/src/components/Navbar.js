import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
      {currentUser && (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
