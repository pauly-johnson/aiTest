const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to handle ChatGPT-4 API requests
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // Replace with the actual free ChatGPT-4 API URL
        const response = await axios.post('https://api.github.com/free-chatgpt4', {
            prompt
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with ChatGPT-4 API:', error);
        res.status(500).json({ error: 'Failed to fetch response from ChatGPT-4 API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});