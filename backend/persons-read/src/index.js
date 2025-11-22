import app from './app.js';

const PORT = process.env.PORT || 4011;

app.listen(PORT, () => {
    console.log(`Servicio persons-read ejecutándose en puerto ${PORT}`);
});