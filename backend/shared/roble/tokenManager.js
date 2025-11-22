import axios from 'axios';

let accessToken = null;
let refreshToken = null;

// Usar variables directas en lugar del config compartido
const getConfig = () => ({
  baseUrl: process.env.ROBLE_BASE_URL || 'https://roble-api.openlab.uninorte.edu.co',
  dbName: process.env.ROBLE_DB_NAME || 'pdata_ceeaacc726',
  email: process.env.ROBLE_USER_EMAIL,
  password: process.env.ROBLE_USER_PASS,
});

/**
 * Inicia sesión en ROBLE y guarda los tokens.
 */
export const initializeAuth = async () => {
  const config = getConfig();
  const res = await axios.post(`${config.baseUrl}/auth/${config.dbName}/login`, {
    email: config.email,
    password: config.password,
  });
  accessToken = res.data.accessToken;
  refreshToken = res.data.refreshToken;
  return accessToken;
};

/**
 * Devuelve el token actual o lo renueva si no hay.
 */
export const getAccessToken = async () => {
  if (!accessToken) {
    return await initializeAuth();
  }
  return accessToken;
};

/**
 * Refresca el token cuando expira.
 */
export const refreshAccessToken = async () => {
  const config = getConfig();
  const res = await axios.post(`${config.baseUrl}/auth/${config.dbName}/refresh-token`, {
    refreshToken,
  });
  accessToken = res.data.accessToken;
  return accessToken;
};
