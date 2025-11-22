import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Logs service running on port ${PORT}`);
});
