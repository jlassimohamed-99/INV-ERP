import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navbar';
import axios from 'axios';
import './ProjectDashboard.css';

const ProjectDashboard = () => {
  const { logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState('active');
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    createdBy: '',
    startDate: '',
    endDate: '',
    status: 'active'
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects/', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/projects', newProject, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setProjects([...projects, response.data]);
      setNewProject({ name: '', description: '', createdBy: '', startDate: '', endDate: '', status: 'active' });
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'active':
        return (
          <div className="project-list">
            {projects.map((project) => (
              <div key={project._id} className="card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        );
      case 'add':
        return (
          <div className="add-project-form">
            <h2>Add New Project</h2>
            <form onSubmit={handleAddProject}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Created By</label>
                <input
                  type="text"
                  name="createdBy"
                  value={newProject.createdBy}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={newProject.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={newProject.endDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={newProject.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <button type="submit">Add Project</button>
            </form>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="project-dashboard">
        <h2>Chef de projet</h2>
        <div className="tabs">
          <button onClick={() => setSelectedTab('active')}>Active Projects</button>
          <button onClick={() => setSelectedTab('add')}>Add Project</button>
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
