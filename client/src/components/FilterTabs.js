import React from 'react';

/**
 * Renders filter buttons for task status.
 * @param {Object} props - Component props.
 * @param {string} props.activeFilter - The currently selected filter.
 * @param {Function} props.onFilterChange - Callback when the filter changes.
 * @returns {JSX.Element} The filter tab UI.
 */
function FilterTabs({ activeFilter, onFilterChange }) {
  const options = ['all', 'completed', 'pending'];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onFilterChange(option)}
          className={`rounded-full px-3 py-2 text-sm font-medium transition ${
            activeFilter === option
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
