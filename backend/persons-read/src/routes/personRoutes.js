import express from 'express';
import { getPersons, getPersonById } from '../controllers/personController.js';

const router = express.Router();

// Rutas de lectura
router.get('/', getPersons);           // Consulta general con filtros opcionales
router.get('/:id', getPersonById);     // Consulta por ID específico

export default router;