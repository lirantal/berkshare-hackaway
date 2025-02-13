import express from "express";
import { lucia } from "./lib/auth.js";
import { db } from "./lib/db.ts";

import { bankProfileRouter } from "./routes/bank_profile.ts";
import { creditScoreRouter } from "./routes/credit_score.ts";
import { memosRouter } from "./routes/memos.ts";
import { userRouter } from "./routes/user.ts";
import { loginRouter } from "./routes/login.ts";
import { signupRouter } from "./routes/signup.ts";
import { logoutRouter } from "./routes/logout.ts";
import { bankStatementsRouter } from "./routes/bank_statements.ts";
import { bankProfileTemplate } from "./routes/bank_profile_template.ts";
import { finchatRouter } from "./routes/finchat.ts";

const app = express();

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

	if (user && user.id) {
		const userAttribute = db.prepare("SELECT role FROM user WHERE id = ?").get(user.id);
		if (user?.id && userAttribute.role === 'admin') {
			res.locals.user.isAdmin = true;
		}
	}
	
	return next();
});


const apiRouter = express.Router();
apiRouter.use(memosRouter, 
	bankProfileRouter, userRouter, loginRouter, 
	signupRouter, logoutRouter, bankStatementsRouter, 
	bankProfileTemplate, creditScoreRouter, finchatRouter);
app.use("/api", apiRouter);

app.use('/data', (req, res, next) => {
	// respond with all CORS allowed headers for this route:
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	
	const d = req.query.d;
	console.log('d', d);
	return res.send('Captured data');
})

app.listen(3005);

console.log("Server running on port 3005");

