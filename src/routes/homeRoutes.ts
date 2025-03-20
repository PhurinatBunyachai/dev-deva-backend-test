import express from 'express';
import { HomeController } from '../controllers/homeController';

const router = express.Router();
const homeController = new HomeController();

router.get('/', homeController.index);
// Add new migration route for creating users table
router.get('/migrate', homeController.migrateUsersTable);

export default router;