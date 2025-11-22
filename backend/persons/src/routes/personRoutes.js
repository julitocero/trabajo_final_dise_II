import express from 'express';
import { getPersons, createPerson, updatePerson, deletePerson } from '../controllers/personController.js';

const router = express.Router();

router.get('/', getPersons);
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

export default router;
