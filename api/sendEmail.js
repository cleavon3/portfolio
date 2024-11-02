require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.EMAIL, // Change to EMAIL
        pass: process.env.PASSWORD, // Change to PASSWORD
    },
    tls: {
        rejectUnauthorized: false, // helps bypass certificate errors
    },
});

const mailOptions = {
    from: process.env.EMAIL, // Use your authenticated email here
    to: 'talktocleavon@gmail.com',
    subject: 'Test Email',
    text: 'Hello from Nodemailer!',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error('Error:', error);
    }
    console.log('Email sent:', info.response);
});
