import express from "express";
import { OpenAI } from "openai";

const openai = new OpenAI();

export const finchatRouter = express.Router();

finchatRouter.post('/finchat', async (req, res) => {
    if (!res.locals.user) {
        return res.status(401).send('Unauthorized');
    }

    const { messages } = req.body;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
    });

    return res.status(200).json({
        success: true,
        message: response.choices[0].message.content,
    });
});

