// src/controllers/authController.js
import { robleLogin, robleSignup, robleLogout, verifyToken } from '../../../shared/roble/robleAuthService.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const tokens = await robleLogin(email, password);
    res.status(200).json(tokens);
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    console.log('📧 Signup attempt for:', email);
    console.log('🔧 ROBLE_DB_NAME:', process.env.ROBLE_DB_NAME);
    console.log('🔧 ROBLE_USER_EMAIL:', process.env.ROBLE_USER_EMAIL);
    console.log('🔧 ROBLE_BASE_URL:', process.env.ROBLE_BASE_URL);

    const result = await robleSignup(email, password, name);
    res.status(201).json(result);
  } catch (error) {
    console.error('❌ Signup error:', error.response?.data || error.message);
    console.error('❌ Full error:', error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const data = await robleLogout();
    res.status(200).json({ message: 'Sesión cerrada', data });
  } catch (error) {
    next(error);
  }
};

export const checkToken = async (req, res, next) => {
  try {
    const data = await verifyToken();
    res.status(200).json({ valid: true, data });
  } catch (error) {
    next(error);
  }
};
