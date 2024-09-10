import express from "express";
import { lucia } from "./lib/auth.js";

import { memosRouter } from "./routes/memos.ts";
import { userRouter } from "./routes/user.ts";
import { loginRouter } from "./routes/login.ts";
import { signupRouter } from "./routes/signup.ts";
import { logoutRouter } from "./routes/logout.ts";

import type { User, Session } from "lucia";

const app = express();

app.use(express.urlencoded());
app.use(express.json());

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
apiRouter.use(memosRouter, userRouter, loginRouter, signupRouter, logoutRouter);
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
