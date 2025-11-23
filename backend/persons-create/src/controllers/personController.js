import { insertRecords, readRecords } from '../../../shared/roble/robleService.js';
import { logAction } from '../services/logService.js';

const TABLE = 'persons';

// Función de validación para creación
const validatePersonData = (data) => {
    const errors = [];
    const { tdocument, ndocument, fname, sname, lname, bday, gender, email, cel, img_Url } = data;

    // Validar tipo de documento
    if (!tdocument || !['T.I', 'C.C'].includes(tdocument)) {
        errors.push('Tipo de documento debe ser T.I o C.C');
    }

    // Validar número de documento
    if (!ndocument) {
        errors.push('Número de documento es requerido');
    } else if (!/^\d+$/.test(ndocument)) {
        errors.push('Número de documento debe contener solo números');
    } else if (ndocument.length > 10) {
        errors.push('Número de documento no puede tener más de 10 caracteres');
    }

    // Validar primer nombre
    if (!fname) {
        errors.push('Primer nombre es requerido');
    } else if (/\d/.test(fname)) {
        errors.push('Primer nombre no puede contener números');
    } else if (fname.length > 30) {
        errors.push('Primer nombre no puede tener más de 30 caracteres');
    }

    // Validar segundo nombre (opcional)
    if (sname && /\d/.test(sname)) {
        errors.push('Segundo nombre no puede contener números');
    } else if (sname && sname.length > 30) {
        errors.push('Segundo nombre no puede tener más de 30 caracteres');
    }

    // Validar apellidos
    if (!lname) {
        errors.push('Apellidos son requeridos');
    } else if (/\d/.test(lname)) {
        errors.push('Apellidos no pueden contener números');
    } else if (lname.length > 60) {
        errors.push('Apellidos no pueden tener más de 60 caracteres');
    }

    // Validar fecha de nacimiento
    if (!bday) {
        errors.push('Fecha de nacimiento es requerida');
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(bday)) {
        errors.push('Fecha de nacimiento debe tener formato YYYY-MM-DD');
    }

    // Validar género
    const validGenders = ['Masculino', 'Femenino', 'No binario', 'Prefiero no responder'];
    if (!gender || !validGenders.includes(gender)) {
        errors.push('Género debe ser: Masculino, Femenino, No binario o Prefiero no responder');
    }

    // Validar email
    if (!email) {
        errors.push('Correo electrónico es requerido');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Formato de correo electrónico inválido');
        }
    }

    // Validar celular
    if (!cel) {
        errors.push('Número de celular es requerido');
    } else if (!/^\d+$/.test(cel)) {
        errors.push('Número de celular debe contener solo números');
    } else if (cel.length !== 10) {
        errors.push('Número de celular debe tener exactamente 10 caracteres');
    }

    // Validar imagen URL
    if (!img_Url) {
        errors.push('URL de imagen es requerida');
    } else if (typeof img_Url !== 'string' || img_Url.trim().length === 0) {
        errors.push('URL de imagen debe ser un texto válido');
    }

    return errors;
};// Función para verificar duplicados
const checkDocumentExists = async (ndocument) => {
    try {
        const existingPersons = await readRecords(TABLE, { ndocument });
        return existingPersons.length > 0;
    } catch (error) {
        console.error('Error checking document existence:', error);
        throw error;
    }
};

export const createPerson = async (req, res, next) => {
    try {
        const {
            tdocument,
            ndocument,
            fname,
            sname,
            lname,
            bday,
            gender,
            email,
            cel,
            img_Url
        } = req.body;

        console.log('Intento de crear persona:', fname, lname, '- Documento:', tdocument, ndocument);

        // Validar datos
        const validationErrors = validatePersonData(req.body);
        if (validationErrors.length > 0) {
            console.log('Errores de validación:', validationErrors);
            return res.status(400).json({
                success: false,
                message: 'Errores de validación',
                errors: validationErrors
            });
        }

        // Verificar duplicados
        const documentExists = await checkDocumentExists(ndocument);
        if (documentExists) {
            console.log('Documento duplicado:', ndocument);
            return res.status(409).json({
                success: false,
                message: 'Ya existe una persona registrada con este número de documento',
                error: 'DUPLICATE_DOCUMENT'
            });
        }

        // Crear persona
        const data = await insertRecords(TABLE, [
            {
                tdocument,
                ndocument,
                fname,
                sname,
                lname,
                bday,
                gender,
                email,
                cel,
                img_Url
            },
        ]);

        console.log('Persona creada exitosamente:', fname, lname);
        console.log('Enviando log de creación...');

        // Enviar log
        const userId = req.body.user_id || req.user?.id || 'system';
        await logAction('CREATE_PERSON', userId, {
            tdocument,
            ndocument,
            fname,
            sname,
            lname,
            email,
            img_Url
        }, ndocument);

        console.log('Log de creación enviado exitosamente');
        res.status(201).json({ success: true, data });
    } catch (error) {
        console.error('Error creando persona:', error.message);
        next(error);
    }
};