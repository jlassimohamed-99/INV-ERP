import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav>
          <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
