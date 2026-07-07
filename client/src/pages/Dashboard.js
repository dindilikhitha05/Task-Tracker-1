import React, { useEffect, useState } from 'react';
import FilterTabs from '../components/FilterTabs';
import ProgressBar from '../components/ProgressBar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { createTask, deleteTask, getAllTasks, updateTask } from '../services/task-service';
import filterTasks from '../utils/filter-tasks';

/**
 * Main dashboard page for the task tracker application.
 * @returns {JSX.Element} The dashboard UI.
 */
function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Loads tasks from the backend.
   * @returns {Promise<void>} Resolves once the task list is loaded.
   */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTasks(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Creates or updates a task based on the current selection.
   * @param {Object} taskData - The task fields to submit.
   * @returns {Promise<void>} Resolves after the request completes.
   */
  const handleSubmit = async (taskData) => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask._id, taskData);
      } else {
        await createTask(taskData);
      }

      await fetchTasks();
      setSelectedTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Toggles a task between pending and completed states.
   * @param {Object} task - The task to update.
   * @returns {Promise<void>} Resolves after the status update completes.
   */
  const handleToggleStatus = async (task) => {
    try {
      const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
      await updateTask(task._id, { ...task, status: nextStatus });
      await fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Deletes a task by ID.
   * @param {string} taskId - The task identifier.
   * @returns {Promise<void>} Resolves after the delete request completes.
   */
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      await fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const visibleTasks = filterTasks(tasks, filter);
  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'completed').length,
    pending: tasks.filter((task) => task.status !== 'completed').length,
  };
  const progressPercent = tasks.length ? Math.round((stats.completed / tasks.length) * 100) : 0;

  const sortedTasks = [...visibleTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityRank = { high: 0, medium: 1, low: 2 };
      return (priorityRank[a.priority || 'medium'] ?? 1) - (priorityRank[b.priority || 'medium'] ?? 1);
    }

    if (sortBy === 'dueDate') {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-500 p-6 text-white shadow-lg sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-100">Task Tracker</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Track your daily tasks in one place</h1>
          <p className="mt-3 max-w-2xl text-sm text-indigo-100 sm:text-base">
            Create, organize, and track progress across your daily tasks with a simple dashboard.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-4">
            <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 sm:p-6">
              <div>
                <h2 className="text-xl font-semibold">Task Overview</h2>
                <p className="text-sm text-slate-500">Filter by progress and keep key work moving.</p>
              </div>
              <div className="flex items-center justify-end">
                <FilterTabs activeFilter={filter} onFilterChange={setFilter} />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Total', value: stats.total },
                { label: 'Completed', value: stats.completed },
                { label: 'Pending', value: stats.pending },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-1 text-xl font-semibold text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <ProgressBar value={progressPercent} />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Sort your view</p>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              >
                <option value="dueDate">Due date</option>
                <option value="priority">Priority</option>
                <option value="createdAt">Newest</option>
              </select>
            </div>

            {error ? <div className="rounded-2xl bg-rose-50 p-3 text-sm text-rose-600">{error}</div> : null}

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                Loading tasks...
              </div>
            ) : (
              <TaskList
                tasks={sortedTasks}
                onEdit={(task) => setSelectedTask(task)}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            )}
          </section>

          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="text-xl font-semibold">{selectedTask ? 'Edit Task' : 'Add a Task'}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {selectedTask ? 'Update the current task details below.' : 'Capture a new task in seconds.'}
              </p>
              <div className="mt-4">
                <TaskForm
                  task={selectedTask}
                  onSubmit={handleSubmit}
                  onCancel={() => setSelectedTask(null)}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
