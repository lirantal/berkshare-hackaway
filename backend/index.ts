import express from "express";

import { lucia } from "./lib/auth.js";

import { loginRouter } from "./routes/login.js";
import { signupRouter } from "./routes/signup.js";
import { logoutRouter } from "./routes/logout.js";

import type { User, Session } from "lucia";

const app = express();

app.use(express.urlencoded());

app.use(async (req, res, next) => {
	const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
	if (!sessionId) {
		res.locals.user = null;
		res.locals.session = null;
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize());
	}
	if (!session) {
		res.appendHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize());
	}
	res.locals.session = session;
	res.locals.user = user;
	return next();
});

const apiRouter = express.Router();
apiRouter.use(loginRouter, signupRouter, logoutRouter);
app.use("/api", apiRouter);

app.listen(3005);

console.log("Server running on port 3005");

declare global {
	namespace Express {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}
