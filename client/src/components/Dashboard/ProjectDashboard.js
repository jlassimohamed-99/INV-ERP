import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectDashboard.css';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isFormShown, setIsFormShown] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', startDate: '', endDate: '', status: '' });

  useEffect(() => {
    fetchProjects();
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

  const handleAddProject = () => {
    setSelectedProjectId(null);
    setIsFormShown(true);
    setFormData({ name: '', description: '', startDate: '', endDate: '', status: '' });
  };

  const handleEditProject = (project) => {
    setSelectedProjectId(project._id);
    setIsFormShown(true);
    setFormData(project);
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
    try {
      if (selectedProjectId) {
        await axios.put(`http://localhost:5000/api/projects/${selectedProjectId}`, formData, {
          headers: { token: localStorage.getItem('token') },
        });
      } else {
        await axios.post('http://localhost:5000/api/projects', formData, {
          headers: { token: localStorage.getItem('token') },
        });
      }
      fetchProjects();
      setIsFormShown(false);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div className="project-dashboard">
      <div className="header">
        <h2>Tableau de Bord des Projets</h2>
        <button onClick={handleAddProject}>+ Ajouter un Projet</button>
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
            />
            <label>Date de Fin</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
            <label>Statut</label>
            <input
              type="text"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
            />
            <button type="submit">Enregistrer</button>
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
              <tr key={project._id}>
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
