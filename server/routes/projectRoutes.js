const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Example route to get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Example route to create a new project
router.post('/', async (req, res) => {
  const { name, description, createdBy, startDate, endDate, status } = req.body;

  try {
    const newProject = new Project({
      name,
      description,
      createdBy,
      startDate,
      endDate,
      status
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
