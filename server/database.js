// server/database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

const initializeDatabase = async () => {
  const db = await dbPromise;

  // initialize users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user'
    )
  `);

  // populate users table with default users
  if ((await db.get('SELECT COUNT(*) as count FROM users')).count < 1) {
    await db.exec(`
      INSERT OR IGNORE INTO users (username, password, role)
      VALUES ('dade', 'gibson', 'user')
    `);
    await db.exec(`
      INSERT OR IGNORE INTO users (username, password, role)
      VALUES ('admin', 'admin', 'admin')
    `);
  }
  
  // initialize user profile table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  // populate user profile table with dade's profile information
  if ((await db.get('SELECT COUNT(*) as count FROM user_profile')).count < 1) {
    await db.exec(`
      INSERT OR IGNORE INTO user_profile (user_id, full_name, email, address, phone_number)
      VALUES (1, 'Fisher Stevens', 'fisher@gibson.com', '5 Wallstreet Avenue, New York, NY 10003', '(212) 998-5117')
      `);

    await db.exec(`
      INSERT OR IGNORE INTO user_profile (user_id, full_name, email, address, phone_number)
      VALUES (2, 'Dade Murphy', 'dade-murphy@nyu.edu', '1 Washington Square, New York, NY 97211', '(212) 998-1337')
      `);
  }

  // initialize memos table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS memos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT NOT NULL,
      text TEXT NOT NULL,
      date TEXT NOT NULL
    )
  `);
};

initializeDatabase();

export default dbPromise;