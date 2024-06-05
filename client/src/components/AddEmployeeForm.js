import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './AddEmployeeForm.css';

function AddEmployeeForm({ setIsFormShown, onEmployeeAdded, isEditMode, setIsEditMode, selectedEmployee }) {
  const [user_id, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [phone, setPhone] = useState('');
  const { register, updateEmployee } = useAuth();

  useEffect(() => {
    if (isEditMode && selectedEmployee) {
      setUserId(selectedEmployee.user_id);
      setName(selectedEmployee.name);
      setEmail(selectedEmployee.email);
      setRole(selectedEmployee.role);
      setPhone(selectedEmployee.phone);
    } else {
      setUserId('');
      setName('');
      setEmail('');
      setPassword('');
      setRole('employee');
      setPhone('');
    }
  }, [isEditMode, selectedEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateEmployee(selectedEmployee._id, { user_id, name, email, role, phone });
        setIsEditMode(false);
      } else {
        await register({ user_id, name, email, password, role, phone });
      }
      onEmployeeAdded();
      setIsFormShown(false);
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>{isEditMode ? 'Edit Employee' : 'Add Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="text"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {!isEditMode && (
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="responsable rh">Responsable RH</option>
              <option value="chef de projet">Chef de Projet</option>
              <option value="comptable">Comptable</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit">{isEditMode ? 'Update Employee' : 'Add Employee'}</button>
          <button type="button" onClick={() => setIsFormShown(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeForm;