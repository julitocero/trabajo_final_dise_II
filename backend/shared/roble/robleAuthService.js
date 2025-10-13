// shared/roble/robleAuthService.js
import axios from 'axios';
import { getAccessToken } from './tokenManager.js';

// Usar variables directas en lugar del config compartido
const getBaseUrl = () => {
  const baseUrl = process.env.ROBLE_BASE_URL || 'https://roble-api.openlab.uninorte.edu.co';
  const dbName = process.env.ROBLE_DB_NAME || 'pdata_ceeaacc726';
  return `${baseUrl}/auth/${dbName}`;
};

export const robleLogin = async (email, password) => {
  const baseUrl = getBaseUrl();
  const res = await axios.post(`${baseUrl}/login`, { email, password });
  return res.data; // { accessToken, refreshToken }
};

export const robleSignup = async (email, password, name) => {
  const baseUrl = getBaseUrl();
  console.log('🔍 Base URL for signup:', baseUrl);
  console.log('🔍 Environment vars:', {
    ROBLE_BASE_URL: process.env.ROBLE_BASE_URL,
    ROBLE_DB_NAME: process.env.ROBLE_DB_NAME
  });

  const res = await axios.post(`${baseUrl}/signup`, { email, password, name });
  return res.data;
};

export const robleLogout = async () => {
  const token = await getAccessToken();
  const baseUrl = getBaseUrl();
  const res = await axios.post(`${baseUrl}/logout`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const verifyToken = async () => {
  const token = await getAccessToken();
  const baseUrl = getBaseUrl();
  const res = await axios.get(`${baseUrl}/verify-token`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};