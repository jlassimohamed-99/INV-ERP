import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Register() {
  const [userData, setUserData] = useState({
    user_id: '',
    name: '',
    email: '',
    password: '',
    role: '',
    phone: ''
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_id"
            placeholder="User ID"
            value={userData.user_id}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={userData.role}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={userData.phone}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
