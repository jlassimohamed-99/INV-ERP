import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [conges, setConges] = useState([]);
  const [formData, setFormData] = useState({ startDate: '', endDate: '', reason: '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('tasks');

  useEffect(() => {
    fetchTasks();
    fetchConges();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { token: localStorage.getItem('token') },
      });
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const fetchConges = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/conges', {
        headers: { token: localStorage.getItem('token') },
      });
      setConges(response.data);
    } catch (err) {
      console.error('Error fetching conges:', err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/conges', formData, {
        headers: { token: localStorage.getItem('token') },
      });
      fetchConges();
      setFormData({ startDate: '', endDate: '', reason: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="employee-dashboard">
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
          {sidebarOpen ? '<<' : '>>'}
        </button>
        <ul className="sidebar-menu">
          <li>
            <button onClick={() => setCurrentView('tasks')}>
              <span>Tasks</span>
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentView('conges')}>
              <span>Demander un Congé</span>
            </button>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="employee-dashboard-container">
        <div className="employee-dashboard-content">
          {currentView === 'tasks' && (
            <>
              <h2>Mes Tâches</h2>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{new Date(task.due_date).toLocaleDateString()}</td>
                      <td>{task.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {currentView === 'conges' && (
            <>
              <h2>Demander un Congé</h2>
              <form onSubmit={handleFormSubmit}>
                <label>Date de Début</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
                <label>Date de Fin</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
                <label>Raison</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                />
                <button type="submit">Demander</button>
              </form>
              <h2>Mes Congés</h2>
              <table>
                <thead>
                  <tr>
                    <th>Date de Début</th>
                    <th>Date de Fin</th>
                    <th>Raison</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {conges.map(conge => (
                    <tr key={conge._id}>
                      <td>{new Date(conge.startDate).toLocaleDateString()}</td>
                      <td>{new Date(conge.endDate).toLocaleDateString()}</td>
                      <td>{conge.reason}</td>
                      <td>{conge.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
