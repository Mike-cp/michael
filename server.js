const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // To parse JSON bodies

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

// Serve static files from the public directory
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
