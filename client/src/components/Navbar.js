import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav>
<<<<<<< Updated upstream
      <ul>
        {currentUser ? (

            <button onClick={logout}>Logout</button>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
=======
          <button onClick={logout}>Logout</button>
>>>>>>> Stashed changes
    </nav>
  );
};

export default Navbar;
