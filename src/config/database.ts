import mysql from 'mysql2/promise';

// Create a connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dev_deva_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;