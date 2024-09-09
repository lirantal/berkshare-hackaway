import Database from "better-sqlite3";

export const db = new Database('database.db', { verbose: console.log });

export interface DatabaseUser {
	id: string;
	username: string;
	password_hash: string;
}
