const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Log the IP address and User-Agent to a file
app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const language = req.headers['accept-language'];
    
    // Prepare log data
    const logData = `IP: ${ip}, User-Agent: ${userAgent}, Language: ${language}\n`;

    // Save log data to a text file
    fs.appendFile(path.join(__dirname, 'click_log.txt'), logData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        }
    });

    // Redirect to the Facebook link
    res.redirect('https://www.facebook.com/profile.php?id=61560873102811&mibextid=LQQJ4d');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
