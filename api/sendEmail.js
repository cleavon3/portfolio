const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }

    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail', // e.g., Gmail
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject || 'No Subject',
        text: message || 'No message provided',
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ status: 'Email sent successfully', info });
    } catch (error) {
        res.status(500).json({ error: `Error sending email: ${error.message}` });
    }
};
