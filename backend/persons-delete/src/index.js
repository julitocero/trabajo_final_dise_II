import app from './app.js';

const PORT = process.env.PORT || 4013;

app.listen(PORT, () => {
    console.log(`Servicio persons-delete ejecutándose en puerto ${PORT}`);
});