import sqlite from "better-sqlite3";

export const db = sqlite(":memory:");

export interface DatabaseUser {
	id: string;
	username: string;
	password_hash: string;
}
