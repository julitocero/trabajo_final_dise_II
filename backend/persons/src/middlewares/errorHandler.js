export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.response?.data || err.message);
    const status = err.response?.status || 500;
    res.status(status).json({
        message: err.response?.data?.message || err.message || 'Error interno del servidor',
    });
};