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

    // Separar filtros de rango de fechas de filtros normales
    const { dateFrom, dateTo, ...normalFilters } = req.query;

    // Obtener logs con filtros normales primero
    const logs = await readRecords(LOG_TABLE, normalFilters);
    console.log(' Found logs before date filtering:', logs?.length || 0);

    // Aplicar filtros de fecha si están presentes
    let filteredLogs = logs || [];
    if (dateFrom || dateTo) {
      filteredLogs = logs.filter(log => {
        if (!log.timesp) return false;

        // Extraer solo la fecha (YYYY-MM-DD) del timestamp
        const logDate = log.timesp.split('T')[0];
        const logDateTime = new Date(logDate);

        let passesFilter = true;

        if (dateFrom) {
          const fromDate = new Date(dateFrom);
          passesFilter = passesFilter && logDateTime >= fromDate;
        }

        if (dateTo) {
          const toDate = new Date(dateTo);
          passesFilter = passesFilter && logDateTime <= toDate;
        }

        return passesFilter;
      });

      console.log(` Date filtering applied (${dateFrom || 'any'} to ${dateTo || 'any'}):`, filteredLogs.length, 'logs');
    }

    // Log de la consulta para auditoría
    const appliedFilters = { ...normalFilters };
    if (dateFrom) appliedFilters.dateFrom = dateFrom;
    if (dateTo) appliedFilters.dateTo = dateTo;

    if (Object.keys(appliedFilters).length > 0) {
      console.log(' Applied filters:', JSON.stringify(appliedFilters));
    }

    res.json({
      success: true,
      data: filteredLogs,
      count: filteredLogs.length,
      filters: appliedFilters,
      dateRange: {
        from: dateFrom || null,
        to: dateTo || null
      }
    });
  } catch (error) {
    console.error(' Error getting logs:', error);
    console.error(' Error details:', error.response?.data || error.message);
    next(error);
  }
};
