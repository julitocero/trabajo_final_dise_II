import express from 'express';
import { login, signup, logout, checkToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup-direct', signup);
router.post('/logout', logout);
router.get('/verify', checkToken);

export default router;
