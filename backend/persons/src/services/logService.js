import axios from 'axios';

const LOGS_SERVICE_URL = process.env.LOGS_SERVICE_URL || 'http://localhost:4003/api/logs';

export const logAction = async (action, user, details = {}) => {
  try {
    console.log('📤 Sending log to:', LOGS_SERVICE_URL);
    console.log('📝 Log data:', { action, user, details });

    // Convertir user a número si es string, usar 1 como fallback si es 'system'
    const user_id = user === 'system' ? 1 : (parseInt(user) || 1);

    const response = await axios.post(LOGS_SERVICE_URL, {
      action,
      user: user_id, // Enviar como número
      details,
      timestamp: new Date().toISOString(),
    });

    console.log('✅ Log sent successfully:', response.status);
  } catch (error) {
    console.error('❌ Error sending log to logs service:', error.message);
    console.error('❌ Logs service URL:', LOGS_SERVICE_URL);
  }
};
