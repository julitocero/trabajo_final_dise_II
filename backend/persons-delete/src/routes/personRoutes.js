import express from 'express';
import { deletePerson } from '../controllers/personController.js';

const router = express.Router();

// Solo ruta de eliminación
router.delete('/:id', deletePerson);

export default router;