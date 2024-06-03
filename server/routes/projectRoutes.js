// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, getAllProjects);
router.get('/:id', auth, getProjectById);
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
