import app from './app.js';

const PORT = process.env.PORT || 4012;

app.listen(PORT, () => {
    console.log(`Servicio persons-update ejecutándose en puerto ${PORT}`);
});