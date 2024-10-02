const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

// Endpoint to log click data
app.post('/log-click', (req, res) => {
    const { userAgent, language } = req.body;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Log the data into a file
    const logData = `IP: ${ipAddress}, User-Agent: ${userAgent}, Language: ${language}\n`;
    const logFilePath = path.join(__dirname, 'click-log.txt');

    fs.appendFile(logFilePath, logData, (err) => {
        if (err) {
            console.error('Error logging data:', err);
            return res.status(500).send('Error logging data');
        }
        res.status(200).send('Logged successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
