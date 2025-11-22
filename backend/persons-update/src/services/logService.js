import axios from 'axios';

const LOG_SERVICE_URL = process.env.LOG_SERVICE_URL || 'http://localhost:4003/api/logs';

export const logAction = async (action, userId, details) => {
    try {
        const response = await axios.post(LOG_SERVICE_URL, {
            action,
            user: Number(userId) || 1,
            details,
            timestamp: new Date().toISOString()
        });

        return response.data;
    } catch (error) {
        console.error('Error enviando log:', error.message);
        throw error;
    }
};