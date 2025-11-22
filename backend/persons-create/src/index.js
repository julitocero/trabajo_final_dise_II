import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 4010;

app.listen(PORT, () => {
    console.log(`Persons CREATE service running on port ${PORT}`);
});