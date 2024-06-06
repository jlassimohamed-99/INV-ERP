const mongoose = require('mongoose');
const Task = require('../models/taskModel');

// Get tasks for a project
const getTasks = async (req, res) => {
  try {
    const projectId = new mongoose.Types.ObjectId(req.params.projectId.trim());
    console.log(`Fetching tasks for project ID: ${projectId}`);
    const tasks = await Task.find({ projectId: projectId, isDeleted: false });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    console.log('Fetching all tasks');
    const tasks = await Task.find({ isDeleted: false });
    console.log(`Found tasks:`, tasks);
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching all tasks:', err);
    res.status(500).send('Server error');
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, status, due_date, responsible, client, projectId } = req.body;
  try {
    const newTask = new Task({ title, description, status, due_date, responsible, client, projectId });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).send('Server error');
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { title, description, status, due_date, responsible, client } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    task.status = status;
    task.due_date = due_date;
    task.responsible = responsible;
    task.client = client;

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
