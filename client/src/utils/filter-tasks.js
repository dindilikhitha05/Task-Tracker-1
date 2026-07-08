// Purpose: Provides a helper function to filter tasks by status.

/**
 * Filters a task list by the selected status.
 * @param {Array<object>} tasks - List of task objects.
 * @param {string} filter - Current filter value.
 * @returns {Array<object>} Filtered list of tasks.
 */
const filterTasks = (tasks, filter) => {
  // Apply only status filters; the "all" tab returns the original list.
  if (filter === 'completed') {
    return tasks.filter((task) => task.status === 'completed');
  }

  if (filter === 'pending') {
    return tasks.filter((task) => task.status === 'pending');
  }

  return tasks;
};

export default filterTasks;
