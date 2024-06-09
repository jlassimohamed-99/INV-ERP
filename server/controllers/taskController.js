const mongoose = require('mongoose');
const Task = require('../models/taskModel');

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
  try {
    const { title, description, due_date, status, responsable, projectId } = req.body;

    const newTask = new Task({
      title,
      description,
      due_date,
      status,
      responsable,
      projectId,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error });
  }
};

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
