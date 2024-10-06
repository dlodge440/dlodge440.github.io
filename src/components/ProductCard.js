import React, { useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline'; // Usa la versione outline dell'icona
import DeteriorationBar from './DeteriorationBar';

const ProductCard = ({ product, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const status = product.fields.status || 'closed'; // Imposta un valore di default
  const statusLower = status.toLowerCase();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Sei sicuro di voler eliminare "${product.fields.description}"?`);
    if (confirmDelete) {
      setIsDeleting(true);
      try {
        await onDelete(product.id);
      } catch (error) {
        console.error('Errore durante l\'eliminazione:', error);
        alert('Si è verificato un errore durante l\'eliminazione del prodotto.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 relative">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-m">{product.fields.description}</h3>
        </div>
        <div className="flex items-center space-x-2">
          {/* Stato del prodotto */}
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              statusLower === 'open'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {status}
          </span>

          {/* Pulsante di eliminazione */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-full flex items-center justify-center transition-colors duration-300 focus:outline-none"
          >
            <XCircleIcon
              className={`w-6 h-6 ${
                isDeleting
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-400 hover:text-red-600'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-xs text-gray-500 mb-1">Deterioramento</p>
        <DeteriorationBar value={product.fields.deterioramento || 0} />
      </div>
    </div>
  );
};

export default ProductCard;




