import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanBoard from '../KanbanBoard'; // Assuming you have a KanbanBoard component

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);

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
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Project Dashboard</h2>
      <KanbanBoard projects={projects} /> {/* Assuming KanbanBoard takes projects as a prop */}
    </div>
  );
};

export default ProjectDashboard;
