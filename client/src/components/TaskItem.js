import React from 'react';
import { formatDateLabel, isTaskOverdue } from '../utils/date-utils';

/**
 * Renders a single task card with action buttons.
 * @param {Object} props - Component props.
 * @param {Object} props.task - The task to render.
 * @param {Function} props.onEdit - Callback for editing the task.
 * @param {Function} props.onDelete - Callback for deleting the task.
 * @param {Function} props.onToggleStatus - Callback for toggling task status.
 * @returns {JSX.Element} The task card UI.
 */
function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  const priority = task.priority || 'medium';
  const overdue = isTaskOverdue(task);

  const priorityClasses = {
    low: 'bg-emerald-100 text-emerald-700',
    medium: 'bg-sky-100 text-sky-700',
    high: 'bg-rose-100 text-rose-700',
  };

  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                task.status === 'completed'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {task.status === 'completed' ? 'Completed' : 'Pending'}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${priorityClasses[priority]}`}>
              {priority} priority
            </span>
          </div>
          {task.description ? <p className="text-sm text-slate-600">{task.description}</p> : null}
          {task.dueDate ? (
            <p className={`mt-2 text-sm ${overdue ? 'text-rose-600' : 'text-slate-500'}`}>
              {overdue ? 'Overdue' : 'Due'} {formatDateLabel(task.dueDate)}
            </p>
          ) : null}
          <p className="mt-2 text-xs text-slate-400">
            Created {formatDateLabel(task.createdAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onToggleStatus(task)}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
          </button>
          <button
            onClick={() => onEdit(task)}
            className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
