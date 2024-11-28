import express from "express";
import { GenerateAccountStatementPDF, 
	RetrieveAccountStatementPDF } from "../services/BankStatements.js"

export const bankStatementsRouter = express.Router();

bankStatementsRouter.post("/bank_statements", async (req, res) => {
  const accountId = req.body.account_id;

  const data = await GenerateAccountStatementPDF(accountId);
  return res.status(200).send({
    report_name: data.reportName,
  });
});

bankStatementsRouter.get("/bank_statements", async (req, res, next) => {
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
    res.setHeader("Content-Type", "application/pdf");
    res.send(fileContents);
    return;
  } catch (error) {
    console.error(error);
    return res.status(404).send("File not found");
  }
});
