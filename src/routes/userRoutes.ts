import express from 'express';
import { UserController } from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

// GET all users
router.get('/users', userController.getAllUsers);

// GET user by name and surname
router.get('/users/:nameSurname', userController.getUserByNameSurname);

// POST create new user
router.post('/users', userController.createUser);

// PUT update user by ID
router.put('/users/:id', userController.updateUser);

// DELETE user by ID
router.delete('/users/:id', userController.deleteUser);

export default router;