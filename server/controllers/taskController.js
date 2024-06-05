const Task = require('../models/taskModel');

// Get tasks for a project
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId, isDeleted: false });
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Server error');
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { taskId, responsible, dueDate, client, note, projectId } = req.body;
  try {
    const newTask = new Task({ taskId, responsible, dueDate, client, note, projectId });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).send('Server error');
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { responsible, dueDate, client, note, status } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    task.responsible = responsible;
    task.dueDate = dueDate;
    task.client = client;
    task.note = note;
    task.status = status;

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
  createTask,
  updateTask,
  deleteTask
};
