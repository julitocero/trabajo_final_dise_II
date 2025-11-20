import { insertRecords, readRecords } from '../../../shared/roble/robleService.js';
import { ROBLE_CONFIG } from '../../../shared/roble/robleConfig.js';

const LOG_TABLE = 'logs';

export const createLog = async (req, res, next) => {
  try {
    console.log(' Received log request:', req.body);
    const { action, user, details, timestamp } = req.body;

    // Validar campos requeridos
    if (!action || !user) {
      console.error(' Missing required fields:', { action, user });
      return res.status(400).json({
        success: false,
        error: 'Action and user are required fields'
      });
    }

    // Preparar datos para insertar
    const logRecord = {
      action: String(action),
      user: Number(user), 
      details: JSON.stringify(details || {}), 
      timesp: timestamp || new Date().toISOString() 
    };

    console.log(' Inserting log record:', logRecord);

    const logData = await insertRecords(LOG_TABLE, [logRecord]);

    console.log(' Log created successfully:', logData);
    res.status(201).json({ success: true, log: logData });
  } catch (error) {
    console.error(' Error creating log:', error);
    console.error(' Error details:', error.response?.data || error.message);
    next(error);
  }
};

export const getLogs = async (req, res, next) => {
  try {
    console.log(' Getting logs with filters:', req.query);
    const logs = await readRecords(LOG_TABLE, req.query);
    console.log(' Found logs:', logs?.length || 0);

    res.json({
      success: true,
      data: logs || [],
      count: logs?.length || 0
    });
  } catch (error) {
    console.error(' Error getting logs:', error);
    console.error(' Error details:', error.response?.data || error.message);
    next(error);
  }
};
