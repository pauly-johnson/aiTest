import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import OpenAI from "openai";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

dotenv.config();

const apiKey = process.env.API_KEY;

// Route to handle ChatGPT-4 API requests
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const client = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com",
            apiKey: apiKey
        });

        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "" },
                { role: "user", content: prompt }
            ],
            model: "gpt-4o",
            temperature: 1,
            max_tokens: 4096,
            top_p: 1
        });

        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error('Error communicating with ChatGPT-4 API:', error);
        res.status(500).json({ error: 'Failed to fetch response from ChatGPT-4 API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});