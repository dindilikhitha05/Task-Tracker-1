import React, { useEffect, useState } from 'react';
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
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Loads all tasks from the backend.
   * @returns {Promise<void>}
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
   * Handles submission for creating or updating a task.
   * @param {object} taskData - Task payload.
   * @returns {Promise<void>}
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
   * @param {object} task - Task object.
   * @returns {Promise<void>}
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
   * @param {string} taskId - Task identifier.
   * @returns {Promise<void>}
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

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-500 p-6 text-white shadow-lg sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-100">Task Tracker</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Stay on top of your work</h1>
          <p className="mt-3 max-w-2xl text-sm text-indigo-100 sm:text-base">
            Create, organize, and track progress across your daily tasks with a simple dashboard.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-xl font-semibold">Task Overview</h2>
                <p className="text-sm text-slate-500">Filter by progress and keep key work moving.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['all', 'completed', 'pending'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilter(option)}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                      filter === option
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {error ? <div className="rounded-2xl bg-rose-50 p-3 text-sm text-rose-600">{error}</div> : null}

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                Loading tasks...
              </div>
            ) : (
              <TaskList
                tasks={visibleTasks}
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
