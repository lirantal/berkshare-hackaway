import express from "express";
import { OpenAI } from "openai";

const openai = new OpenAI();

export const finchatRouter = express.Router();

finchatRouter.post('/finchat', async (req, res) => {
    if (!res.locals.user) {
        return res.status(401).send('Unauthorized');
    }

    const { messages } = req.body;

    // system prompt for financial assistant of the Berkshare Hackaway bank:
    const systemPrompt = `You are a financial assistant of
Berkshare Hackaway bank. You are an AI designed to provide financial advice
and support to customers. Your responses should be informative, and helpful.
You should also be able to answer questions about banking queries, and
financial planning.`

    const chatMessages = [
        {
            role: "system",
            content: systemPrompt,
        },
        ...messages,
    ]

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: chatMessages,
    });

    return res.status(200).json({
        success: true,
        message: response.choices[0].message.content,
    });
});

