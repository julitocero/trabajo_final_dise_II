import { insertRecords, readRecords } from '../../../shared/roble/robleService.js';
import { ROBLE_CONFIG } from '../../../shared/roble/robleConfig.js';

const LOG_TABLE = 'logs';

export const createLog = async (req, res, next) => {
  try {
    console.log('📥 Received log request:', req.body);
    const { action, user, details, timestamp } = req.body;

    const logData = await insertRecords(LOG_TABLE, [
      {
        action,
        user: user, // Usar el user que viene del request
        details: JSON.stringify(details), // Convertir object a string
        timesp: timestamp
      },
    ]);

    console.log('✅ Log created successfully:', logData);
    res.status(201).json({ success: true, log: logData });
  } catch (error) {
    console.error('❌ Error creating log:', error);
    next(error);
  }
};

export const getLogs = async (req, res, next) => {
  try {
    console.log('📋 Getting logs with filters:', req.query);
    const logs = await readRecords(LOG_TABLE, req.query);
    console.log('📊 Found logs:', logs?.length || 0);
    res.json(logs);
  } catch (error) {
    console.error('❌ Error getting logs:', error);
    next(error);
  }
};
