const express = require('express');
const app = express();
const PORT = 3000;

// SSE route
app.get('/events', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow only localhost:3001
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Send a comment to establish the connection
    res.write(': Connected to SSE\n\n');

    // Function to send a message to the client
    const sendRandomNumber = () => {
        const randomNum = Math.floor(Math.random() * 100);
        console.log(`sending new random numer ${randomNum}`)
        res.write(`data: ${JSON.stringify({ number: randomNum })}\n\n`);
    };

    // Send a new random number every 3 seconds
    const intervalId = setInterval(sendRandomNumber, 3000);

    // When the client closes the connection, stop the interval
    req.on('close', () => {
        clearInterval(intervalId);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});