import { deleteRecord, readRecords } from '../../../shared/roble/robleService.js';
import { logAction } from '../services/logService.js';

const TABLE = 'persons';

export const deletePerson = async (req, res, next) => {
    try {
        const { id } = req.params;

        console.log('Intento de eliminar persona con ID:', id);

        // Verificar que la persona existe antes de eliminar
        const existingPerson = await readRecords(TABLE, { _id: id });
        if (existingPerson.length === 0) {
            console.log('Persona no encontrada para eliminación:', id);
            return res.status(404).json({
                success: false,
                message: 'Persona no encontrada'
            });
        }

        // Guardar información para el log antes de eliminar
        const personInfo = existingPerson[0];

        // Eliminar persona
        const data = await deleteRecord(TABLE, '_id', id);

        console.log('Persona eliminada exitosamente:', personInfo.fname, personInfo.lname);
        console.log('Enviando log de eliminación...');

        // Enviar log
        const userId = req.body.user_id || req.query.user_id || req.user?.id || 'system';
        await logAction('DELETE_PERSON', userId, {
            personId: id,
            deletedPerson: {
                name: `${personInfo.fname} ${personInfo.lname}`,
                document: `${personInfo.tdocument} ${personInfo.ndocument}`,
                email: personInfo.email
            }
        });

        console.log('Log de eliminación enviado exitosamente');
        res.json({
            success: true,
            message: 'Persona eliminada exitosamente',
            data
        });
    } catch (error) {
        console.error('Error eliminando persona:', error.message);
        next(error);
    }
};