import axios from 'axios';

// Use REACT_APP_API_URL as the base (CRA). Fallback to the original deployed API.
const BASE_URL = process.env.REACT_APP_API_URL || 'https://task-tracker-o168.onrender.com';
const API_URL = `${BASE_URL.replace(/\/$/, '')}/api/tasks`;

/**
 * Fetches all tasks from the backend API.
 * @returns {Promise<Array>} List of task objects.
 */
const getAllTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
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
    return response.data;
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
    const response = await axios.post(API_URL, taskData);
    return response.data;
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
    const response = await axios.put(`${API_URL}/${id}`, taskData);
    return response.data;
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
