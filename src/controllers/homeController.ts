import { Request, Response } from 'express';
import db from '../config/database';

export class HomeController {
  public index(req: Request, res: Response) {
    res.send('Welcome to the Home Page');
  }

  public async migrateUsersTable(req: Request, res: Response) {
    const tableName = 'users'; 
    try {
        // Check if users table already exists
        const createTableQuery = `
        CREATE TABLE ${tableName} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          firstName VARCHAR(255),
          lastName VARCHAR(255),
          gender VARCHAR(50),
          image LONGTEXT,
          birthDate DATE
        )
      `;

      // Check if the table exists
      const [rows] = await db.execute(`SHOW TABLES LIKE '${tableName}'`);
      
      if (Array.isArray(rows) && rows.length === 0) {
        // Create users table
        await db.execute(createTableQuery);
        
        res.status(200).json({ message: `${tableName} table created successfully` });
      } else {
        res.status(200).json({ message: `${tableName} table already exists` });
      }
    } catch (error: any) {
      console.error('Migration error:', error);
      res.status(500).json({ 
        error: `Failed to create ${tableName} table`, 
        message: error.message || 'Unknown error occurred'
      });
    }
  }
}