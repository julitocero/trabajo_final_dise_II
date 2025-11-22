import express from 'express';
import cors from 'cors';
import logRoutes from './routes/logRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/logs', logRoutes);
app.use(errorHandler);

export default app;
