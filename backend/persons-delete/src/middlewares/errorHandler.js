export const errorHandler = (err, req, res, next) => {
    console.error('Error en persons-delete:', err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor de eliminación';

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};