const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// Define routes
router.get('/', authMiddleware, getProjects);
router.post('/', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
