const mongoose = require('mongoose');
const Project = require('../models/projectModel');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isDeleted: false }).populate('responsable', 'name');
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).send(err);
  }
};

const createProject = async (req, res) => {
  const { name, description, startDate, endDate, status, responsable } = req.body;

  try {
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      status,
      responsable,
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).send('Server error');
  }
};

const updateProject = async (req, res) => {
  const { name, description, startDate, endDate, status, responsable } = req.body;

  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    project.name = name;
    project.description = description;
    project.startDate = startDate;
    project.endDate = endDate;
    project.status = status;
    project.responsable = responsable;

    await project.save();
    res.json(project);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).send('Server error');
  }
};

const deleteProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    project.isDeleted = true;
    await project.save();
    res.json({ msg: 'Project soft deleted' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
