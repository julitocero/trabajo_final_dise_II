// src/controllers/authController.js
import { robleLogin, robleSignup, robleLogout, verifyToken } from '../../../shared/roble/robleAuthService.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Intento de login para:', email);

    const tokens = await robleLogin(email, password);
    console.log('Login exitoso para:', email);

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: tokens
    });
  } catch (error) {
    console.error('Error en login para:', email, '- Error:', error.response?.data || error.message);
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    console.log('Signup attempt for:', email);
    console.log('ROBLE_DB_NAME:', process.env.ROBLE_DB_NAME);
    console.log('ROBLE_USER_EMAIL:', process.env.ROBLE_USER_EMAIL);
    console.log('ROBLE_BASE_URL:', process.env.ROBLE_BASE_URL);

    const result = await robleSignup(email, password, name);
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: result
    });
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    console.error('Full error:', error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    console.log('Cerrando sesión...');
    const data = await robleLogout();
    console.log('Sesión cerrada exitosamente');

    res.status(200).json({
      success: true,
      message: 'Sesión cerrada exitosamente',
      data
    });
  } catch (error) {
    console.error('Error cerrando sesión:', error.response?.data || error.message);
    next(error);
  }
};

export const checkToken = async (req, res, next) => {
  try {
    console.log('Verificando token...');
    const data = await verifyToken();
    console.log('Token válido');

    res.status(200).json({
      success: true,
      message: 'Token válido',
      valid: true,
      data
    });
  } catch (error) {
    console.error('Token inválido o expirado:', error.response?.data || error.message);
    next(error);
  }
};
