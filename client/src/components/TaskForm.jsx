import React, { useEffect, useState } from 'react';

/**
 * Renders the task form for adding or editing a task.
 * @param {object} props - Component props.
 * @param {object|null} props.task - Task currently being edited.
 * @param {Function} props.onSubmit - Callback when the form is submitted.
 * @param {Function} props.onCancel - Callback when edit is canceled.
 * @returns {JSX.Element} The task form UI.
 */
function TaskForm({ task, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'pending');
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  }, [task]);

  /**
   * Handles form submission and validates input.
   * @param {object} event - Form submit event.
   * @returns {void}
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setError('');
    onSubmit({ title: title.trim(), description: description.trim(), status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
          placeholder="Enter task title"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
          rows="3"
          placeholder="Add some notes"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
        >
          {task ? 'Update Task' : 'Add Task'}
        </button>
        {task ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default TaskForm;
