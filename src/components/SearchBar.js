// src/components/SearchBar.js
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'; // Import corretto per Heroicons v2

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Cerca prodotti..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-4 pr-12 rounded-full shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Ombra soft
        }}
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
