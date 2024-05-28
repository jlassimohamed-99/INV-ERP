const Project = require('../models/Project');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Create a new project
exports.createProject = async (req, res) => {
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
};

// Update a project
exports.updateProject = async (req, res) => {
  const { name, description, createdBy, startDate, endDate, status } = req.body;

  // Build project object
  const projectFields = {};
  if (name) projectFields.name = name;
  if (description) projectFields.description = description;
  if (createdBy) projectFields.createdBy = createdBy;
  if (startDate) projectFields.startDate = startDate;
  if (endDate) projectFields.endDate = endDate;
  if (status) projectFields.status = status;

  try {
    let project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: 'Project not found' });

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: 'Project not found' });

    await Project.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Project removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
