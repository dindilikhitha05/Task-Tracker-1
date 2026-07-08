import axios from 'axios';

// Use the local API in development so new fields match the current backend code.
const DEFAULT_API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://task-tracker-o168.onrender.com';
const BASE_URL = process.env.REACT_APP_API_URL || DEFAULT_API_URL;
const API_URL = `${BASE_URL.replace(/\/$/, '')}/api/tasks`;

/**
 * Normalizes task form data before sending it to the API.
 * @param {object} taskData - Raw task payload from the UI.
 * @returns {object} API-ready task payload.
 */
const normalizeTaskPayload = (taskData = {}) => ({
  ...taskData,
  priority: taskData.priority || 'medium',
  dueDate: taskData.dueDate || null,
});

/**
 * Normalizes API task responses for fields the UI expects.
 * @param {object} task - Task returned from the backend.
 * @returns {object} Normalized task object.
 */
const normalizeTask = (task) => ({
  ...task,
  priority: task.priority || 'medium',
  dueDate: task.dueDate || null,
});

/**
 * Fetches all tasks from the backend API.
 * @returns {Promise<Array>} List of task objects.
 */
const getAllTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    // Older records may not have newer optional fields, so normalize every task.
    return response.data.map(normalizeTask);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Unable to fetch tasks');
  }
};

/**
 * Fetches a single task by ID.
 * @param {string} id - Task ID.
 * @returns {Promise<object>} Task object.
 */
const getTaskById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return normalizeTask(response.data);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Unable to fetch task');
  }
};

/**
 * Creates a new task via the backend API.
 * @param {object} taskData - Task input payload.
 * @returns {Promise<object>} Created task.
 */
const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, normalizeTaskPayload(taskData));
    return normalizeTask(response.data);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Unable to create task');
  }
};

/**
 * Updates an existing task via the backend API.
 * @param {string} id - Task ID.
 * @param {object} taskData - Updated task payload.
 * @returns {Promise<object>} Updated task.
 */
const updateTask = async (id, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, normalizeTaskPayload(taskData));
    return normalizeTask(response.data);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Unable to update task');
  }
};

/**
 * Deletes a task via the backend API.
 * @param {string} id - Task ID.
 * @returns {Promise<object>} Delete confirmation.
 */
const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Unable to delete task');
  }
};

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
