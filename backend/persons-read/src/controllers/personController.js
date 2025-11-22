import { readRecords } from '../../../shared/roble/robleService.js';
import { logAction } from '../services/logService.js';

const TABLE = 'persons';

export const getPersons = async (req, res, next) => {
    try {
        console.log('Consultando personas con filtros:', req.query);

        // Usar req.query directamente como filtros
        const data = await readRecords(TABLE, req.query);
        console.log('Consulta exitosa, encontradas:', data.length, 'personas');

        // Log opcional para auditoría (solo si hay filtros específicos)
        const userId = req.query.user_id || 'system';
        if (Object.keys(req.query).length > 0 && !req.query.user_id) {
            await logAction('READ_PERSONS_FILTERED', userId, {
                filters: req.query,
                count: data.length
            });
        } else if (Object.keys(req.query).length === 0 || (Object.keys(req.query).length === 1 && req.query.user_id)) {
            await logAction('READ_ALL_PERSONS', userId, { count: data.length });
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error consultando personas:', error.message);
        next(error);
    }
};

export const getPersonById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log('Buscando persona por ID:', id);

        const data = await readRecords(TABLE, { _id: id });

        if (data.length === 0) {
            console.log('Persona no encontrada con ID:', id);
            return res.status(404).json({
                success: false,
                message: 'Persona no encontrada'
            });
        }

        console.log('Persona encontrada:', data[0].fname, data[0].lname);

        // Log de consulta
        const userId = req.query.user_id || 'system';
        await logAction('READ_PERSON_BY_ID', userId, {
            personId: id,
            name: `${data[0].fname} ${data[0].lname}`
        });

        res.json({ success: true, data: data[0] });
    } catch (error) {
        console.error('Error obteniendo persona por ID:', error.message);
        next(error);
    }
};

export const getPersonByDocument = async (req, res, next) => {
    try {
        const { ndocument } = req.params;
        console.log('Buscando persona por documento:', ndocument);

        const data = await readRecords(TABLE, { ndocument });

        if (data.length === 0) {
            console.log('Persona no encontrada con documento:', ndocument);
            return res.status(404).json({
                success: false,
                message: 'No se encontró una persona con ese número de documento'
            });
        }

        console.log('Persona encontrada:', data[0].fname, data[0].lname);

        // Log de consulta
        const userId = req.query.user_id || 'system';
        await logAction('READ_PERSON_BY_DOCUMENT', userId, {
            document: ndocument,
            name: `${data[0].fname} ${data[0].lname}`
        });

        res.json({ success: true, data: data[0] });
    } catch (error) {
        console.error('Error obteniendo persona por documento:', error.message);
        next(error);
    }
};