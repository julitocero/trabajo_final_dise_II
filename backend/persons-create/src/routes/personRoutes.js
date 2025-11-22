import express from 'express';
import { createPerson } from '../controllers/personController.js';

const router = express.Router();

// Solo ruta POST para creación
router.post('/', createPerson);

export default router;