import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import { config } from './config/app';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', homeRoutes);
app.use('/', userRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});