// shared/roble/robleConfig.js
export const ROBLE_CONFIG = {
  baseUrl: 'https://roble-api.openlab.uninorte.edu.co',
  dbName: process.env.ROBLE_DB_NAME,     // ejemplo: "token_project_xyz"
  email: process.env.ROBLE_USER_EMAIL,   // usuario registrado en ROBLE
  password: process.env.ROBLE_USER_PASS, // su contraseña
};
