import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import { config } from './config/app';
import cors from 'cors';

// Parse database connection string from DATABASE_URL if it exists
if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  process.env.DB_HOST = url.hostname;
  process.env.DB_USER = url.username;
  process.env.DB_PASSWORD = url.password;
  process.env.DB_NAME = url.pathname.substring(1);
}
const app = express();

app.use(cors());

// Middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/', homeRoutes);
app.use('/api/', userRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});