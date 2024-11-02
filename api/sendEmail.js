// sendEmail.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.PASSWORD, // Your email password
    },
    tls: {
        rejectUnauthorized: false, // Helps bypass certificate errors
    },
});

// Function to send email
const sendMail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error); // Reject the promise with the error
            }
            resolve(info); // Resolve the promise with the info
        });
    });
};

// Export the sendMail function
module.exports = sendMail;
