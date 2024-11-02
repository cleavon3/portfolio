// server.js
const express = require('express');
const sendMail = require('./sendEmail');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/api/sendEmail', async (req, res) => {
    console.log('Request received:', req.body); // Log the request body for debugging

    // Extract details from the request body
    const { email, subject, message } = req.body;

    // Check if the email field is provided in the request
    if (!email) {
        return res.status(400).json({ error: 'Recipient email is required' });
    }

    // Define mail options
    const mailOptions = {
        from: process.env.EMAIL, // Your authenticated email
        to: email, // Email provided in the request
        subject: subject || 'No Subject', // Default subject if not provided
        text: message || 'No message provided', // Default message if not provided
    };

    try {
        const info = await sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ status: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 'Failed to send email', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
