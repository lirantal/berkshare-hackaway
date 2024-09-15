import { db } from "../lib/db.js";
import { hash } from "@node-rs/argon2";
import { generateId } from "lucia";

const users = [
    {
        username: "admin",
        password: "admin",
        role: "admin",
        full_name: "Eugene Belford",
        address: "5 Wallstreet Avenue, New York, NY 10003",
        phone_number: "(212) 998-5117",
        email: "eugene@gibson.com"
    },
    {
        username: "dade",
        password: "gibson",
        role: "user",
        full_name: "Dade Murphy",
        address: "1 Washington Square, New York, NY 97211",
        phone_number: "(212) 998-1337",
        email: "dade-murphy@nyu.edu"
    },
]

// create necessary tables
db.exec(`
    CREATE TABLE IF NOT EXISTS user (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES user(id)
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS memos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      text TEXT NOT NULL,
      meta TEXT NOT NULL DEFAULT '{}',
      date TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES user(id)
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS bank_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      opening_balance TEXT NOT NULL,
      fee_per_transaction TEXT NOT NULL,
      credit_limit TEXT NOT NULL,
      account_number TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES user(id)
    )
`);


const usersInDatabase: number = db.prepare('SELECT COUNT(*) as count FROM user').pluck().get();

if (usersInDatabase <= 0) {
    for (const user of users) {

        const passwordHash = await hash(user.password);
        const userId = generateId(15);

        console.log(`Creating user: ${user.username}`);
        db.prepare("INSERT INTO user (id, username, password_hash) VALUES(?, ?, ?)").run(
            userId,
            user.username,
            passwordHash
        );

        console.log(`Creating user profile for: ${user.username}`);
        db.prepare(`
            INSERT INTO user_profile (user_id, full_name, email, address, phone_number)
            VALUES(?, ?, ?, ?, ?)`
            ).run(
                userId,
                user.full_name,
                user.email,
                user.address,
                user.phone_number
        );

        console.log(`Creating bank profile for: ${user.username}`);
        db.prepare(`
            INSERT INTO bank_profile
            (user_id, opening_balance, fee_per_transaction, credit_limit, account_number)
            VALUES(?, ?, ?, ?, ?)`
            ).run(
                userId,
                100,
                1,
                5000,
                generateId(6)
        );
    }
    
}