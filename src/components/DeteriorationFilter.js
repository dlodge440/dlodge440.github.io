// src/components/DeteriorationFilter.js
import React from 'react';

const DeteriorationFilter = ({ deteriorationFilter, setDeteriorationFilter }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Deterioramento
    </label>
    <input
      type="range"
      min="0"
      max="100"
      value={deteriorationFilter}
      onChange={(e) => setDeteriorationFilter(Number(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
    <div className="flex justify-between text-xs text-gray-600 mt-1">
      <span>0%</span>
      <span>100%</span>
    </div>
  </div>
);

export default DeteriorationFilter;
