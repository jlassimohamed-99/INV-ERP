const mongoose = require('mongoose');
const Task = require('../models/taskModel');

// Get tasks for a project
const getTasks = async (req, res) => {
  try {
    const projectId = req.query.projectId ? req.query.projectId.trim() : null;
    const query = { isDeleted: false };
    if (projectId) query.projectId = projectId;
    const tasks = await Task.find(query).populate('responsable', 'name').populate('projectId', 'name');
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Server error');
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ isDeleted: false }).populate('responsable', 'name').populate('projectId', 'name');
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching all tasks:', err);
    res.status(500).send('Server error');
  }
};

const createTask = async (req, res) => {
  const { title, description, due_date, status, responsable, projectId } = req.body;

  if (!responsable || !projectId) {
    return res.status(400).json({ error: 'responsable and projectId are required' });
  }

  try {
    const task = new Task({
      title,
      description,
      due_date,
      status,
      responsable,
      projectId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { title, description, status, due_date, responsable, projectId } = req.body;

  if (!responsable || !projectId) {
    return res.status(400).json({ error: 'responsable and projectId are required' });
  }

  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    task.status = status;
    task.due_date = due_date;
    task.responsable = responsable;
    task.projectId = projectId;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Server error');
  }
};

// Soft delete a task
const deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    task.isDeleted = true;
    await task.save();
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getTasks,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
