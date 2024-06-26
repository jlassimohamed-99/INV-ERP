import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanBoard from '../KanbanBoard';
import './ProjectDashboard.css';
import { useNavigate } from 'react-router-dom';

const ProjectDashboard = ({ onProjectClick }) => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isFormShown, setIsFormShown] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', startDate: '', endDate: '', status: 'To Do', responsable: '' });
  const [showKanbanBoard, setShowKanbanBoard] = useState(false);
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects', {
        headers: { token: localStorage.getItem('token') },
      });
      const activeProjects = response.data.filter(project => !project.isDeleted);
      setProjects(activeProjects);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { token: localStorage.getItem('token') },
      });
      const filteredUsers = response.data.filter(user => user.role === 'admin' || user.role === 'chef de projet');
      setUsers(filteredUsers);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const handleAddProject = () => {
    setSelectedProjectId(null);
    setIsFormShown(true);
    setFormData({ name: '', description: '', startDate: '', endDate: '', status: 'To Do', responsable: '' });
    setDateError('');
  };

  const handleEditProject = (project) => {
    setSelectedProjectId(project._id);
    setIsFormShown(true);
    setFormData({
      name: project.name,
      description: project.description,
      startDate: new Date(project.startDate).toISOString().split('T')[0],
      endDate: new Date(project.endDate).toISOString().split('T')[0],
      status: project.status,
      responsable: project.responsable
    });
    setDateError('');
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        headers: { token: localStorage.getItem('token') },
      });
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err.response ? err.response.data : err.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setDateError('Date de Début doit être avant la Date de Fin.');
      return;
    }
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        responsable: formData.responsable
      };

      if (selectedProjectId) {
        await axios.put(`http://localhost:5000/api/projects/${selectedProjectId}`, payload, {
          headers: { token: localStorage.getItem('token') },
        });
      } else {
        await axios.post('http://localhost:5000/api/projects', payload, {
          headers: { token: localStorage.getItem('token') },
        });
      }
      fetchProjects();
      setIsFormShown(false);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
    setShowKanbanBoard(true);
  };

  const handleReturn = () => {
    setShowKanbanBoard(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (showKanbanBoard) {
    return <KanbanBoard onReturn={handleReturn} projectId={selectedProjectId} />;
  }

  return (
    <div className="project-dashboard">
      <div className="header">
        <h2>Tableau de Bord des Projets</h2>
        <button onClick={handleAddProject}>+ Ajouter un Projet</button>
        {role !== 'admin' && (
          <button onClick={handleLogout} className="logout-button">Se Déconnecter</button>
        )}
      </div>
      {isFormShown && (
        <div className="form-container">
          <form onSubmit={handleFormSubmit}>
            <label>Nom</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <label>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
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
            {dateError && <p className="error">{dateError}</p>}
            <label>Statut</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <label>Responsable</label>
            <select
              value={formData.responsable}
              onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
              required
            >
              <option value="">Select Responsable</option>
              {users.map(filteredUsers => (
                <option key={filteredUsers._id} value={filteredUsers._id}>
                  {filteredUsers.name}
                </option>
              ))}
            </select>
            <button type="submit" disabled={new Date(formData.startDate) >= new Date(formData.endDate)}>Enregistrer</button>
            <button type="button" onClick={() => setIsFormShown(false)}>Annuler</button>
          </form>
        </div>
      )}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Date de Début</th>
              <th>Date de Fin</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} onClick={() => handleProjectClick(project._id)}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{new Date(project.startDate).toLocaleDateString()}</td>
                <td>{new Date(project.endDate).toLocaleDateString()}</td>
                <td>{project.status}</td>
                <td>
                  <button onClick={(e) => { e.stopPropagation(); handleEditProject(project); }}>Modifier</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(project._id); }}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectDashboard;
