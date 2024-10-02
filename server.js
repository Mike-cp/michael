const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Log click information
app.post('/log', (req, res) => {
    const { userAgent, language } = req.body;

    // Get the IP address from the request
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Create a log entry
    const logEntry = `IP: ${ip}, User-Agent: ${userAgent}, Language: ${language}\n`;

    // Append the log entry to the click_log.txt file
    fs.appendFile('click_log.txt', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            return res.status(500).send('Internal Server Error');
        }
        
        // Redirect to Facebook profile
        res.redirect('https://www.facebook.com/profile.php?id=61560873102811&mibextid=LQQJ4d');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
