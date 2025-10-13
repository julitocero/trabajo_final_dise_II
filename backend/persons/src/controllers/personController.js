import { insertRecords, readRecords, updateRecord, deleteRecord } from '../../../shared/roble/robleService.js';
import { ROBLE_CONFIG } from '../../../shared/roble/robleConfig.js';
import { logAction } from '../services/logService.js';

const TABLE = 'persons';

// Función de validación
const validatePersonData = (data, isPartialUpdate = false) => {
  const errors = [];
  const { tdocument, ndocument, fname, sname, lname, bday, gender, email, cel } = data;

  // Validar tipo de documento
  if (tdocument !== undefined) {
    if (!tdocument || !['T.I', 'C.C'].includes(tdocument)) {
      errors.push('Tipo de documento debe ser T.I o C.C');
    }
  } else if (!isPartialUpdate) {
    errors.push('Tipo de documento es requerido');
  }

  // Validar número de documento
  if (ndocument !== undefined) {
    if (!ndocument) {
      errors.push('Número de documento es requerido');
    } else if (!/^\d+$/.test(ndocument)) {
      errors.push('Número de documento debe contener solo números');
    } else if (ndocument.length > 10) {
      errors.push('Número de documento no puede tener más de 10 caracteres');
    }
  } else if (!isPartialUpdate) {
    errors.push('Número de documento es requerido');
  }

  // Validar primer nombre
  if (fname !== undefined) {
    if (!fname) {
      errors.push('Primer nombre es requerido');
    } else if (/\d/.test(fname)) {
      errors.push('Primer nombre no puede contener números');
    } else if (fname.length > 30) {
      errors.push('Primer nombre no puede tener más de 30 caracteres');
    }
  } else if (!isPartialUpdate) {
    errors.push('Primer nombre es requerido');
  }

  // Validar segundo nombre (siempre opcional)
  if (sname !== undefined && sname) {
    if (/\d/.test(sname)) {
      errors.push('Segundo nombre no puede contener números');
    } else if (sname.length > 30) {
      errors.push('Segundo nombre no puede tener más de 30 caracteres');
    }
  }

  // Validar apellidos
  if (lname !== undefined) {
    if (!lname) {
      errors.push('Apellidos son requeridos');
    } else if (/\d/.test(lname)) {
      errors.push('Apellidos no pueden contener números');
    } else if (lname.length > 60) {
      errors.push('Apellidos no pueden tener más de 60 caracteres');
    }
  } else if (!isPartialUpdate) {
    errors.push('Apellidos son requeridos');
  }

  // Validar fecha de nacimiento
  if (bday !== undefined) {
    if (!bday) {
      errors.push('Fecha de nacimiento es requerida');
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(bday)) {
      errors.push('Fecha de nacimiento debe tener formato YYYY-MM-DD');
    }
  } else if (!isPartialUpdate) {
    errors.push('Fecha de nacimiento es requerida');
  }

  // Validar género
  if (gender !== undefined) {
    const validGenders = ['Masculino', 'Femenino', 'No binario', 'Prefiero no responder'];
    if (!gender || !validGenders.includes(gender)) {
      errors.push('Género debe ser: Masculino, Femenino, No binario o Prefiero no responder');
    }
  } else if (!isPartialUpdate) {
    errors.push('Género es requerido');
  }

  // Validar email
  if (email !== undefined) {
    if (!email) {
      errors.push('Correo electrónico es requerido');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Formato de correo electrónico inválido');
      }
    }
  } else if (!isPartialUpdate) {
    errors.push('Correo electrónico es requerido');
  }

  // Validar celular
  if (cel !== undefined) {
    if (!cel) {
      errors.push('Número de celular es requerido');
    } else if (!/^\d+$/.test(cel)) {
      errors.push('Número de celular debe contener solo números');
    } else if (cel.length !== 10) {
      errors.push('Número de celular debe tener exactamente 10 caracteres');
    }
  } else if (!isPartialUpdate) {
    errors.push('Número de celular es requerido');
  }

  return errors;
};

// Función para verificar si ya existe una persona con el mismo número de documento
const checkDocumentExists = async (ndocument, excludeId = null) => {
  try {
    const existingPersons = await readRecords(TABLE, { ndocument });

    if (excludeId) {
      // Para actualizaciones, excluir la persona actual
      return existingPersons.some(person => person.id !== excludeId);
    }

    // Para creación, cualquier coincidencia es un duplicado
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
      cel
    } = req.body;

    // Validar datos
    const validationErrors = validatePersonData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: validationErrors
      });
    }

    // Verificar si ya existe una persona con el mismo número de documento
    const documentExists = await checkDocumentExists(ndocument);
    if (documentExists) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe una persona registrada con este número de documento',
        error: 'DUPLICATE_DOCUMENT'
      });
    }

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
        cel
      },
    ]);

    console.log('👤 Person created successfully, sending log...');

    // En el futuro, esto vendrá del middleware de autenticación: req.user.id
    // Por ahora, puede venir del body o usar 'system' como fallback
    const userId = req.body.user_id || req.user?.id || 'system';

    await logAction('CREATE_PERSON', userId, {
      tdocument,
      ndocument,
      fname,
      sname,
      lname,
      email
    });

    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}; export const getPersons = async (req, res, next) => {
  try {
    const data = await readRecords(TABLE, req.query);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updatePerson = async (req, res, next) => {
  try {
    const { id } = req.params; // Obtener ID de la URL
    const updates = req.body; // Los updates ahora vienen directamente en el body

    // Validar que solo se actualicen campos permitidos
    const allowedFields = ['tdocument', 'ndocument', 'fname', 'sname', 'lname', 'bday', 'gender', 'email', 'cel'];
    const filteredUpdates = {};

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    // Validar solo los campos que se van a actualizar
    if (Object.keys(filteredUpdates).length > 0) {
      const validationErrors = validatePersonData(filteredUpdates, true); // true = es actualización parcial
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Errores de validación en la actualización',
          errors: validationErrors
        });
      }

      // Si se está actualizando el número de documento, verificar que no exista ya
      if (filteredUpdates.ndocument) {
        const documentExists = await checkDocumentExists(filteredUpdates.ndocument, id);
        if (documentExists) {
          return res.status(409).json({
            success: false,
            message: 'Ya existe otra persona registrada con este número de documento',
            error: 'DUPLICATE_DOCUMENT'
          });
        }
      }
    }

    const updated = await updateRecord(TABLE, '_id', id, filteredUpdates);

    const userId = req.body.user_id || req.user?.id || 'system';
    await logAction('UPDATE_PERSON', userId, { id, updates: filteredUpdates });

    res.json({ success: true, updated });
  } catch (error) {
    next(error);
  }
}; export const deletePerson = async (req, res, next) => {
  try {
    const { id } = req.params; // Obtener ID de la URL
    const userId = req.body?.user_id || req.user?.id || 'system';

    const deleted = await deleteRecord(TABLE, '_id', id);

    await logAction('DELETE_PERSON', userId, { id });

    res.json({ success: true, deleted });
  } catch (error) {
    next(error);
  }
};
