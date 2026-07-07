import React from 'react';

/**
 * Renders a simple progress bar for completed task percentage.
 * @param {Object} props - Component props.
 * @param {number} props.value - The completion percentage value.
 * @returns {JSX.Element} The progress bar UI.
 */
function ProgressBar({ value }) {
  const percent = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
        <span>Progress</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-200">
        <div className="h-2.5 rounded-full bg-emerald-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
