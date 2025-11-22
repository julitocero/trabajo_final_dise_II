import express from 'express';
import { updatePerson } from '../controllers/personController.js';

const router = express.Router();

// Solo ruta de actualización
router.put('/:id', updatePerson);

export default router;