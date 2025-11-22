// shared/roble/robleService.js
import axios from 'axios';
import { getAccessToken } from './tokenManager.js';

// Usar variables directas en lugar del config compartido
const getBaseUrl = () => {
  const baseUrl = process.env.ROBLE_BASE_URL || 'https://roble-api.openlab.uninorte.edu.co';
  const dbName = process.env.ROBLE_DB_NAME || 'pdata_ceeaacc726';
  return `${baseUrl}/database/${dbName}`;
};

export const insertRecords = async (tableName, records) => {
  const token = await getAccessToken();
  const baseUrl = getBaseUrl();
  const res = await axios.post(`${baseUrl}/insert`, { tableName, records }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const readRecords = async (tableName, filters = {}) => {
  const token = await getAccessToken();
  const baseUrl = getBaseUrl();
  const res = await axios.get(`${baseUrl}/read`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { tableName, ...filters },
  });
  return res.data;
};

export const updateRecord = async (tableName, idColumn, idValue, updates) => {
  const token = await getAccessToken();
  const baseUrl = getBaseUrl();
  const res = await axios.put(`${baseUrl}/update`, {
    tableName, idColumn, idValue, updates,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteRecord = async (tableName, idColumn, idValue) => {
  const token = await getAccessToken();
  const baseUrl = getBaseUrl();
  const res = await axios.delete(`${baseUrl}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { tableName, idColumn, idValue },
  });
  return res.data;
};
