const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sendEmail = require('./sendEmail'); // Adjusted path to sendEmail.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // Middleware to parse JSON requests

// Endpoint for sending emails
app.post('/api/sendEmail', sendEmail);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
