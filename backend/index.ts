import express from "express";
import { lucia } from "./lib/auth.js";
import { db } from "./lib/db.ts";

import { bankProfileRouter } from "./routes/bank_profile.ts";
import { memosRouter } from "./routes/memos.ts";
import { userRouter } from "./routes/user.ts";
import { loginRouter } from "./routes/login.ts";
import { signupRouter } from "./routes/signup.ts";
import { logoutRouter } from "./routes/logout.ts";

import { GenerateAccountStatementPDF, 
	RetrieveAccountStatementPDF } from "./services/BankStatements.js"

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

	if (user && user.id) {
		const userAttribute = db.prepare("SELECT role FROM user WHERE id = ?").get(user.id);
		if (user?.id && userAttribute.role === 'admin') {
			res.locals.user.isAdmin = true;
		}
	}
	
	return next();
});



app.post('/bank_statements', async (req, res, next) => {

	const accountId = req.body.account_id;

	const data = await GenerateAccountStatementPDF(accountId);
	return res.status(200).send({
		report_name: data.reportName
	});
});


app.get('/bank_statements', async (req, res, next) => {

	let reportName = req.body.report_name;

	// should we apply some sanitization? maybe 🤷
	// if (reportName.startsWith('/')) {
	// 	console.log('reportName starts with /, not allowed');
	// 	return res.status(401).send();
	// }

	// if (reportName.startsWith('..')) {
	// 	console.log('reportName starts with .., not allowed to do path traversal');
	// 	return res.status(401).send();
	// }

	try {
		const fileContents = await RetrieveAccountStatementPDF(reportName);
		// @TODO return a response for a PDF binary file that is read from disk with fs.readFile:
		res.setHeader('Content-Type', 'application/pdf');
		res.send(fileContents);
		return;
	} catch (error) {
		console.error(error);
		return res.status(404).send("File not found");
	}

});

const apiRouter = express.Router();
apiRouter.use(memosRouter, bankProfileRouter, userRouter, loginRouter, signupRouter, logoutRouter);
app.use("/api", apiRouter);

app.listen(3005);

console.log("Server running on port 3005");

