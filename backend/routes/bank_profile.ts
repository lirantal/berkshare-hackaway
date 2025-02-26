import express from "express";
import { db } from "../lib/db.js";

export const bankProfileRouter = express.Router();

bankProfileRouter.get('/bank_profile/:id', (req, res) => {
    if (!res.locals.user) {
        return res.status(401).send('Unauthorized');
    }

    const user_id = req.params.id

    const bankProfile = db.prepare(`SELECT * FROM bank_profile WHERE user_id = ?`).get(user_id);

    return res.status(200).json({
        success: true,
        bank_profile: bankProfile
    });
});

bankProfileRouter.post('/bank_profile', (req, res) => {
    if (!res.locals.user) {
        return res.status(401).send('Unauthorized');
    }

    if (res.locals.user.isAdmin) {
        console.log(`Detected admin user: ${res.locals.user.username}`);
    } else {
        return res.status(401).send('Unauthorized');
    }

    db.prepare(`
        UPDATE bank_profile
        SET
            opening_balance = :opening_balance,
            fee_per_transaction = :fee_per_transaction,
            credit_limit = :credit_limit
        WHERE account_number = :account_number
    `).run({
        opening_balance: req.body.opening_balance,
        fee_per_transaction: req.body.fee_per_transaction,
        credit_limit: req.body.credit_limit,
        account_number: req.body.account_number
    });

    return res.status(200).json({
        success: true
    });
});

