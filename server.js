// server.js
const express = require('express');
const sendMail = require('./sendEmail');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/api/sendEmail', (req, res) => {
    const { name, email, subject, message } = req.body;

    sendMail({ name, email, subject, message }, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ status: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ status: 'Email sent successfully' });
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
