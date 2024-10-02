const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Log click information and redirect to Facebook
app.post('/log', (req, res) => {
    const { userAgent, language } = req.body;
    const logEntry = `IP: ${req.ip}, User-Agent: ${userAgent}, Language: ${language}\n`;
    
    // Write to the log file
    fs.appendFile(path.join(__dirname, 'click_log.txt'), logEntry, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Internal Server Error');
        }
        // Redirect to the Facebook link
        res.redirect('https://www.facebook.com/profile.php?id=61560873102811&mibextid=LQQJ4d');
    });
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
