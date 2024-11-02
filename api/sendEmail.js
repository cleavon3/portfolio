const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

module.exports = async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: 'recipient@example.com',
        subject: subject || 'No Subject',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ status: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error occurred: ', error.message);
        res.status(500).json({ status: 'Failed to send email' });
    }
};
