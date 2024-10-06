// src/services/airtableService.js

import axios from 'axios';
// import logging from 'logging'; // Se utilizzi un modulo di logging personalizzato

const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.REACT_APP_AIRTABLE_TABLE_NAME;

const airtableInstance = axios.create({
  baseURL: `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async () => {
  try {
    const response = await airtableInstance.get();
    return response.data.records;
  } catch (error) {
    console.error('Errore nel recuperare i prodotti:', error);
    return { "error": error.message };
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await airtableInstance.post('', { fields: productData });
    return response.data;
  } catch (error) {
    console.error('Errore nella creazione del prodotto:', error);
    return { "error": error.message };
  }
};

export const updateProduct = async (recordId, updatedData) => {
  try {
    const response = await airtableInstance.patch(`/${recordId}`, { fields: updatedData });
    return response.data;
  } catch (error) {
    console.error('Errore nell\'aggiornamento del prodotto:', error);
    return { "error": error.message };
  }
};

export const deleteProduct = async (recordId) => {
  try {
    await airtableInstance.delete(`/${recordId}`);
    return { "status": "Product removed" };
  } catch (error) {
    console.error('Errore nell\'eliminazione del prodotto:', error);
    return { "error": error.message };
  }
};

export const readSingleRecord = async (recordId) => {
  try {
    const response = await airtableInstance.get(`/${recordId}`);
    return response.data;
  } catch (error) {
    console.error(`Errore nel recuperare il record con ID ${recordId}:`, error);
    return { "error": error.message };
  }
};
