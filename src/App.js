// src/App.js
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import DeteriorationFilter from './components/DeteriorationFilter';
import CategoryGroup from './components/CategoryGroup';
import ProductCard from './components/ProductCard'; // Assicurati di importare ProductCard
import { fetchProducts, deleteProduct } from './services/airtableService';
import './App.css';
import logo from './images/freedge_LogoV2.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deteriorationFilter, setDeteriorationFilter] = useState(0); // Inizializzato a 0
  const [expandedCategories, setExpandedCategories] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsInitialLoading] = useState(true); // Stato di caricamento

  useEffect(() => {
    const getProducts = async () => {
      try {
        const records = await fetchProducts();
        console.log('Records fetchati:', records);
        if (records.error) {
          setError(records.error);
        } else {
          setProducts(records);

          //Filtro solo i prodotti in frigo
          const filteredRecords = records.filter(product => product.fields.lastPosition === "in")

          // Ottieni le nuove categorie dal fetch
          const newCategories = [...new Set(filteredRecords.map(p => p.fields.category))];

          // Aggiorna solo le categorie nuove, mantenendo lo stato di quelle esistenti
          setExpandedCategories(prev => {
            const updatedCategories = { ...prev };
            newCategories.forEach(cat => {
              if (!(cat in updatedCategories)) {
                updatedCategories[cat] = true; // Imposta lo stato espanso solo per le nuove categorie
              }
            });
            return updatedCategories;
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsInitialLoading(false);
      }
    };

    // Prima chiamata per caricare i prodotti
    getProducts();

    // Intervallo per il fetching ogni 5 secondi
    const intervalId = setInterval(getProducts, 5000); // 5000 ms = 5 secondi

    // Cleanup dell'intervallo al momento dello smontaggio del componente
    return () => clearInterval(intervalId);
  }, []);

  // Funzione per gestire l'eliminazione di un prodotto
  const handleDeleteProduct = async (recordId) => {
    try {
      console.log(`Chiamata deleteProduct per record ID: ${recordId}`);
      const result = await deleteProduct(recordId);
      console.log(`Risultato deleteProduct:`, result);
      
      if (result.error) {
        setError(result.error);
        console.error('Errore nell\'eliminazione del prodotto:', result.error);
        toast.error(`Errore nell'eliminazione del prodotto: ${result.error}`);
      } else {
        // Aggiorna subito lo stato rimuovendo l'elemento eliminato
        setProducts(prevProducts => {
          const updatedProducts = prevProducts.filter(product => product.id !== recordId);
          return [...updatedProducts];
        });
        
        console.log(`Prodotto con ID ${recordId} eliminato correttamente.`);
        toast.success('Prodotto eliminato con successo!');
      }
    } catch (error) {
      setError(error.message);
      console.error('Errore nell\'eliminazione del prodotto:', error);
      toast.error(`Errore nell'eliminazione del prodotto: ${error.message}`);
    }
  };

  // Filtra i prodotti in base alla ricerca e al deterioramento (percentuale da 0 a 100)
  const filteredProducts = products.filter((product) => {
    const description = product.fields.description || '';
    const deterioration = (product.fields.deterioramento || 0) * 100; // Moltiplica per 100 per convertire in percentuale
    const descriptionMatch = description.toLowerCase().includes(searchTerm.toLowerCase());
    const deteriorationMatch = deterioration >= deteriorationFilter; // Confronta con il range di deterioramento
    return descriptionMatch && deteriorationMatch;
  });

  // Raggruppa i prodotti per categoria
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = product.fields.category || 'Unknown';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen bg-gray-50">
      {/* <img src={logo} alt="FridgeAI Logo" className="app-logo" /> */}

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <DeteriorationFilter
        deteriorationFilter={deteriorationFilter}
        setDeteriorationFilter={setDeteriorationFilter}
      />

      {isLoading ? (
        <div className="text-center text-gray-600">Caricamento...</div>
      ) : error ? (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          Errore: {error}
        </div>
      ) : Object.keys(groupedProducts).length === 0 ? (
        <div className="text-center text-gray-600">Nessun prodotto trovato.</div>
      ) : (
        Object.entries(groupedProducts).map(([category, products]) => (
          <CategoryGroup
            key={category}
            category={category}
            products={products}
            isExpanded={expandedCategories[category]}
            onToggle={() => toggleCategory(category)}
            // Passa la funzione di eliminazione a ogni prodotto
            renderProduct={(product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDeleteProduct}
              />
            )}
          />
        ))
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;

