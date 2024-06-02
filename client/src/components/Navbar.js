import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
