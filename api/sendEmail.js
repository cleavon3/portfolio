const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for 587
    auth: {
        user: 'talktocleavon@gmail.com', // replace with your Gmail email
        pass: 'zhsqzrhygprdqblw',     // replace with your generated App Password
    },
    tls: {
        rejectUnauthorized: false, // helps bypass certificate errors
    },
});

const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello from Nodemailer!',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error('Error:', error);
    }
    console.log('Email sent:', info.response);
});
