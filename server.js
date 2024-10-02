const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Log click events and save to a file
app.post('/log', (req, res) => {
    const logData = {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        language: req.headers['accept-language'],
        timestamp: new Date().toISOString(),
    };

    // Append log data to the log.txt file
    fs.appendFile('log.txt', JSON.stringify(logData) + '\n', (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Internal Server Error');
        }
        res.sendStatus(200); // Respond with a 200 status
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Log click events and save to a file
app.post('/log', (req, res) => {
    const logData = {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        language: req.headers['accept-language'],
        timestamp: new Date().toISOString(),
    };

    // Append log data to the log.txt file
    fs.appendFile('log.txt', JSON.stringify(logData) + '\n', (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Internal Server Error');
        }
        res.sendStatus(200); // Respond with a 200 status
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
