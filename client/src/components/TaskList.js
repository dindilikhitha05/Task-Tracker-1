import React from 'react';
import TaskItem from './TaskItem';

/**
 * Renders a list of tasks or an empty state.
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.tasks - The tasks to render.
 * @param {Function} props.onEdit - Callback for editing a task.
 * @param {Function} props.onDelete - Callback for deleting a task.
 * @param {Function} props.onToggleStatus - Callback for toggling a task status.
 * @returns {JSX.Element} The task list UI.
 */
function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
        No tasks available for this view.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
}

export default TaskList;
