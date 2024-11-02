// server.js
const express = require('express');
const sendMail = require('./sendEmail');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.post('/api/sendEmail', async (req, res) => {
    console.log('Request received:', req.body); // Log the request body
    const { name, email, subject, message } = req.body;
    // Define mail options
    const mailOptions = {
        from: process.env.EMAIL, // Use your authenticated email
        to: email, // Send to the email provided in the request
        subject: subject || 'No Subject', // Use provided subject or default
        text: message || 'No message provided', // Use provided message or default
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

app.get('/api/sendEmail', (req, res) => {
    res.send('Server is running!');
});
// Start the server
const PORT = process.env.PORT || 3000; // Use environment port or default to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
