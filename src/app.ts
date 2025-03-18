import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import { config } from './config/app';
import cors from 'cors';
const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', homeRoutes);
app.use('/api/', userRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});