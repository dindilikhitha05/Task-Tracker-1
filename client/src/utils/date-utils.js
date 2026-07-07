/**
 * Formats a date value into a readable label.
 * @param {string|Date|null} value - The date to format.
 * @returns {string} The formatted date label.
 */
const formatDateLabel = (value) => {
  if (!value) return 'No date';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'No date';

  return date.toLocaleDateString();
};

/**
 * Checks whether a task is overdue based on its due date.
 * @param {Object} task - The task to evaluate.
 * @returns {boolean} True when the task is overdue and not completed.
 */
const isTaskOverdue = (task) => {
  if (!task?.dueDate || task.status === 'completed') return false;

  const dueDate = new Date(task.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return dueDate < today;
};

export { formatDateLabel, isTaskOverdue };
