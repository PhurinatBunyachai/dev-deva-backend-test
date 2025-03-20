
import { Request, Response } from 'express';
import db from '../config/database';

export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const [users] = await db.query(
        `SELECT id, firstName, lastName, gender, birthDate, image 
         FROM users`
      );
      res.json({ message: 'Get all users', users });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }

  public async getUserByNameSurname(req: Request, res: Response): Promise<void> {
    try {
      const { nameSurname } = req.params;
      const [users] = await db.query(
        `SELECT * FROM users 
         WHERE firstName LIKE ? OR lastName LIKE ?`,
        [`%${nameSurname}%`, `%${nameSurname}%`]
      );
      
      if (!users || (Array.isArray(users) && users.length === 0)) {
        res.status(200).json({ message: 'User not found' ,users:  []});
        return;
      }
      
      res.json({ message: `Get user with name and surname: ${nameSurname}`, users });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const [result] = await db.query(
        `INSERT INTO users (firstName, lastName, gender, birthDate, image) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          userData.first_name,
          userData.last_name,
          userData.gender,
          new Date(userData.birthday),
          userData.profile_picture
        ]
      );
      
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userData = req.body;
      
      await db.query(
        `UPDATE users 
         SET firstName = ?, lastName = ?, gender = ?, birthDate = ?, image = ? 
         WHERE id = ?`,
        [
          userData.firstName,
          userData.lastName,
          userData.gender,
          new Date(userData.birthDate),
          userData.image,
          parseInt(id)
        ]
      );
      
      res.json({ message: `User with ID ${id} updated successfully` });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      await db.query(
        `DELETE FROM users WHERE id = ?`,
        [parseInt(id)]
      );
      
      res.json({ message: `User with ID ${id} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}