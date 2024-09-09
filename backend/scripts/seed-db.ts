import { db } from "../lib/db.js";
import { hash } from "@node-rs/argon2";
import { generateId } from "lucia";

const users = [
    {
        username: "admin",
        password: "admin",
        role: "admin",
    },
    {
        username: "dade",
        password: "gibson",
        role: "user",
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


const usersInDatabase: Number = db.prepare('SELECT COUNT(*) as count FROM user').pluck().get();

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
    }
}