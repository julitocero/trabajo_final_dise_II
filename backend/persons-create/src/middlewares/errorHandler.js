export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.response?.data || err.message);
    const status = err.response?.status || 500;

    let errorMessage = 'Error interno del servidor';
    let errorDetails = null;

    if (err.response?.data) {
        errorMessage = err.response.data.message || err.response.data.error || errorMessage;
        errorDetails = err.response.data;
    } else if (err.message) {
        errorMessage = err.message;
    }

    res.status(status).json({
        success: false,
        message: errorMessage,
        error: errorDetails || errorMessage,
        status
    });
};