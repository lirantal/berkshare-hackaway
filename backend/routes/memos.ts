import express from "express";
import { db } from "../lib/db.js";

export const memosRouter = express.Router();

memosRouter.get('/memos', (req, res) => {
    if (!res.locals.user) {
        return res.status(401).send('Unauthorized');
    }

    const memos = db.prepare(`SELECT memos.id, memos.text, memos.meta, memos.date, user_profile.full_name, user_profile.user_id FROM memos JOIN 
        user_profile ON memos.user_id = user_profile.user_id WHERE memos.user_id = ?`).all(res.locals.user.id);
    return res.status(200).json({
        success: true,
        memos
    });
});