
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.users.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          gender: true,
          birthDate: true,
          image: true,
        },
      });
      res.json({ message: 'Get all users', users });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }

  public async getUserByNameSurname(req: Request, res: Response): Promise<void> {
    try {
      const { nameSurname } = req.params;
      const users = await prisma.users.findMany({
        where: {
          OR: [
            {
              firstName: {
                contains: nameSurname
              }
            },
            {
              lastName: {
                contains: nameSurname
              }
            }
          ]
        }
      });
      
      if (!users) {
        res.status(404).json({ message: 'User not found' });
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
      const newUser = await prisma.users.create({
        data: {
          firstName: userData.first_name,
          lastName: userData.last_name,
          gender: userData.gender,
          birthDate: new Date(userData.birthday),
          image: userData.profile_picture,

        }
      });
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userData = req.body;
      
      const user = await prisma.users.update({
        where: { id: parseInt(id) },
        data: userData
      });
      
      res.json({ message: `User with ID ${id} updated successfully`, user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      await prisma.users.delete({
        where: { id: parseInt(id) }
      });
      
      res.json({ message: `User with ID ${id} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}