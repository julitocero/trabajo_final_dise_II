import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import personRoutes from './routes/personRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/persons', personRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'persons-delete', timestamp: new Date().toISOString() });
});

// Middleware de manejo de errores
app.use(errorHandler);

export default app;