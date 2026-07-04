import React from 'react';

/**
 * Renders a single task row with action buttons.
 * @param {object} props - Component props.
 * @param {object} props.task - Task object.
 * @param {Function} props.onEdit - Callback for editing the task.
 * @param {Function} props.onDelete - Callback for deleting the task.
 * @param {Function} props.onToggleStatus - Callback for toggling task completion.
 * @returns {JSX.Element} The task item UI.
 */
function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                task.status === 'completed'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {task.status === 'completed' ? 'Completed' : 'Pending'}
            </span>
          </div>
          {task.description ? <p className="text-sm text-slate-600">{task.description}</p> : null}
          <p className="mt-2 text-xs text-slate-400">
            Created {new Date(task.createdAt).toLocaleDateString()}
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
