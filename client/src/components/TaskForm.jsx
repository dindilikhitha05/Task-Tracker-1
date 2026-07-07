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
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const formatDateForInput = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('pending');
    setPriority('medium');
    setDueDate('');
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'pending');
      setPriority(task.priority || 'medium');
      setDueDate(formatDateForInput(task.dueDate));
    } else {
      resetForm();
    }
  }, [task]);

  /**
   * Handles form submission and validates input.
   * @param {object} event - Form submit event.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setError('');
    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate || null,
    });

    if (!task) {
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
          placeholder="Enter task title"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
          rows="3"
          placeholder="Add some notes"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
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
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Priority</label>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
        />
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
