// src/components/DeteriorationBar.js
import React from 'react';

const DeteriorationBar = ({ value }) => {
//   const percentage = (value / 10) * 100;
const percentage = value*100;
  const color = `hsl(${(100 - percentage) * 1.2}, 80%, 50%)`; // Da verde a rosso

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="h-2 rounded-full transition-all duration-300 ease-in-out"
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
};

export default DeteriorationBar;
