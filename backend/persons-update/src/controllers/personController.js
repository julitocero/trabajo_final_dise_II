import { updateRecord, readRecords } from '../../../shared/roble/robleService.js';
import { logAction } from '../services/logService.js';

const TABLE = 'persons';

// Función de validación para actualización
const validateUpdateData = (data) => {
    const errors = [];
    const { tdocument, ndocument, fname, sname, lname, bday, gender, email, cel, img_Url } = data;

    // Validar tipo de documento (si se proporciona)
    if (tdocument && !['T.I', 'C.C'].includes(tdocument)) {
        errors.push('Tipo de documento debe ser T.I o C.C');
    }

    // Validar número de documento (si se proporciona)
    if (ndocument) {
        if (!/^\d+$/.test(ndocument)) {
            errors.push('Número de documento debe contener solo números');
        } else if (ndocument.length > 10) {
            errors.push('Número de documento no puede tener más de 10 caracteres');
        }
    }

    // Validar primer nombre (si se proporciona)
    if (fname) {
        if (/\d/.test(fname)) {
            errors.push('Primer nombre no puede contener números');
        } else if (fname.length > 30) {
            errors.push('Primer nombre no puede tener más de 30 caracteres');
        }
    }

    // Validar segundo nombre (si se proporciona)
    if (sname && /\d/.test(sname)) {
        errors.push('Segundo nombre no puede contener números');
    } else if (sname && sname.length > 30) {
        errors.push('Segundo nombre no puede tener más de 30 caracteres');
    }

    // Validar apellidos (si se proporciona)
    if (lname) {
        if (/\d/.test(lname)) {
            errors.push('Apellidos no pueden contener números');
        } else if (lname.length > 60) {
            errors.push('Apellidos no pueden tener más de 60 caracteres');
        }
    }

    // Validar fecha de nacimiento (si se proporciona)
    if (bday && !/^\d{4}-\d{2}-\d{2}$/.test(bday)) {
        errors.push('Fecha de nacimiento debe tener formato YYYY-MM-DD');
    }

    // Validar género (si se proporciona)
    const validGenders = ['Masculino', 'Femenino', 'No binario', 'Prefiero no responder'];
    if (gender && !validGenders.includes(gender)) {
        errors.push('Género debe ser: Masculino, Femenino, No binario o Prefiero no responder');
    }

    // Validar email (si se proporciona)
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Formato de correo electrónico inválido');
        }
    }

    // Validar celular (si se proporciona)
    if (cel) {
        if (!/^\d+$/.test(cel)) {
            errors.push('Número de celular debe contener solo números');
        } else if (cel.length !== 10) {
            errors.push('Número de celular debe tener exactamente 10 caracteres');
        }
    }

    // Validar imagen URL (si se proporciona)
    if (img_Url) {
        if (typeof img_Url !== 'string' || img_Url.trim().length === 0) {
            errors.push('URL de imagen debe ser un texto válido');
        }
    }

    return errors;
};

// Verificar si el documento ya existe (para otro registro)
const checkDocumentExistsForOther = async (ndocument, currentId) => {
    try {
        const existingPersons = await readRecords(TABLE, { ndocument });
        return existingPersons.some(person => person._id !== currentId);
    } catch (error) {
        console.error('Error checking document existence:', error);
        throw error;
    }
};

export const updatePerson = async (req, res, next) => {
    try {
        const { id } = req.params;
        const requestData = req.body;

        console.log('Intento de actualizar persona con ID:', id);

        // Filtrar solo los campos permitidos para actualización (excluir campos de control)
        const allowedFields = ['tdocument', 'ndocument', 'fname', 'sname', 'lname', 'bday', 'gender', 'email', 'cel', 'img_Url'];
        const updateData = {};

        allowedFields.forEach(field => {
            if (requestData[field] !== undefined) {
                updateData[field] = requestData[field];
            }
        });

        console.log('Campos a actualizar:', Object.keys(updateData));

        // Verificar que la persona existe
        const existingPerson = await readRecords(TABLE, { _id: id });
        if (existingPerson.length === 0) {
            console.log('Persona no encontrada para actualización:', id);
            return res.status(404).json({
                success: false,
                message: 'Persona no encontrada'
            });
        }

        // Validar datos de actualización
        const validationErrors = validateUpdateData(updateData);
        if (validationErrors.length > 0) {
            console.log('Errores de validación en actualización:', validationErrors);
            return res.status(400).json({
                success: false,
                message: 'Errores de validación',
                errors: validationErrors
            });
        }

        // Verificar duplicados de documento (si se está actualizando)
        if (updateData.ndocument) {
            const documentExists = await checkDocumentExistsForOther(updateData.ndocument, id);
            if (documentExists) {
                console.log('Documento duplicado en actualización:', updateData.ndocument);
                return res.status(409).json({
                    success: false,
                    message: 'Ya existe otra persona registrada con este número de documento',
                    error: 'DUPLICATE_DOCUMENT'
                });
            }
        }

        // Actualizar persona
        const data = await updateRecord(TABLE, '_id', id, updateData);

        console.log('Persona actualizada exitosamente:', id);
        console.log('Enviando log de actualización...');

        // Enviar log (usar el campo user del request para el log)
        const userId = requestData.user || requestData.user_id || 'system';
        await logAction('UPDATE_PERSON', userId, {
            personId: id,
            updatedFields: Object.keys(updateData),
            oldName: `${existingPerson[0].fname} ${existingPerson[0].lname}`,
            newName: `${updateData.fname || existingPerson[0].fname} ${updateData.lname || existingPerson[0].lname}`
        }, existingPerson[0].ndocument);

        console.log('Log de actualización enviado exitosamente');
        res.json({ success: true, data });
    } catch (error) {
        console.error('Error actualizando persona:', error.message);
        console.error('Error stack:', error.stack);
        next(error);
    }
};