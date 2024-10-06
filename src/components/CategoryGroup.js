// src/components/CategoryGroup.js
import React from 'react';
import ProductCard from './ProductCard'; // Importa ProductCard
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const categoryEmojis = {
  'Dairy Products': '🧀',
  'Eggs': '🥚',
  'Meat': '🥩',
  'Fish': '🎣',
  'Fruits': '🍇',
  'Vegetables': '🍅',
  'Sauces and condiments': '🥫',
  'Leftovers': '🍜',
  'Bread': '🍞'
  // Aggiungi altre categorie ed emoji se necessario
};

const CategoryGroup = ({ category, products, isExpanded, onToggle, renderProduct }) => (
  <div className="mb-4">
    <button
      onClick={() => { 
        console.log(`Toggle categoria: ${category}`);
        onToggle(); 
      }}
      className="flex items-center justify-between w-full p-3 bg-slate-800 rounded-lg shadow-sm hover:bg-slate-900 transition-colors duration-200"
    >
      <span className="font-medium text-lg text-white">
        {categoryEmojis[category] || '📦'} {category}
      </span>
      <span className="text-xl">
        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-white" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-white" />
        )}
      </span>
    </button>
    {isExpanded && (
      <div className="mt-2 space-y-2">
        {products.map((product) => (
          renderProduct ? renderProduct(product) : <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )}
  </div>
);

export default CategoryGroup;

