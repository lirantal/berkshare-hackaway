import express from "express";
import { db } from "../lib/db.js";

export const bankProfileRouter = express.Router();

bankProfileRouter.get('/bank_profile', (req, res) => {
    if (!res.locals.user) {
        return res.status(401).send('Unauthorized');
    }

    const bankProfile = db.prepare(`SELECT * FROM bank_profile WHERE user_id = ?`).get(res.locals.user.id);

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
    }

    // @TODO implementation for saving bank profile

    return res.status(200).json({
        success: true
    });
});
