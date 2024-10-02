const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/log', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Get user's IP
    const userAgent = req.headers['user-agent']; // Get user's User-Agent
    const language = req.headers['accept-language']; // Get user's Language

    // Log the click information
    const logInfo = `IP: ${ip}, User-Agent: ${userAgent}, Language: ${language}\n`;
    fs.appendFile('click_log.txt', logInfo, (err) => {
        if (err) {
            console.error('Error writing to log:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Click logged');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
