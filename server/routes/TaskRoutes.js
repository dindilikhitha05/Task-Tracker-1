// Purpose: Defines the RESTful API routes for task operations.
const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

/**
 * Routes HTTP task API requests to controller handlers.
 * @returns {express.Router} Configured task router.
 */
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
