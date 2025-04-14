import express from "express";
import { db } from "../lib/db.js";
import { verify } from "@node-rs/argon2";
import { lucia } from "../lib/auth.js";

import type { DatabaseUser } from "../lib/db.js";

export const loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
	const username: string | null = req.body.username ?? null;
	const password: string | null = req.body.password ?? null;
	
	const existingUser = await db().get("SELECT * FROM user WHERE username = ?", username)
	if (!existingUser) {
		return res.status(400).json({ error: "Invalid username or password" });
	}

	const validPassword = await verify(existingUser.password_hash, password);
	if (!validPassword) {
		return res.status(400).json({ error: "Invalid username or password" });
	}

	const session = await lucia.createSession(existingUser.id, {});
	return res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
		.status(200)
		.json({
			success: true,
		})
});