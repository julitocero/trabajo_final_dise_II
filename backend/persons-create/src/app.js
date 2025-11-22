import express from 'express';
import cors from 'cors';
import personRoutes from './routes/personRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/persons', personRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'persons-create', timestamp: new Date().toISOString() });
});

// Middleware de manejo de errores
app.use(errorHandler);

export default app;