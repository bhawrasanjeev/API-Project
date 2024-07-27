const nodemailer = require('nodemailer');

async function sendMail(to, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bhawrasanjeev@gmail.com',
                pass: 'yjtn aejg zehz lwva'
            }
        });

        const mailOptions = {
            from: 'bhawrasanjeev@gmail.com',
            to: to,
            subject: subject,
            text: text
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result);
        return result;
    } catch (error) {
        console.error('Error sending email:', error.response ? error.response : error);
        throw error;
    }
}

module.exports = sendMail;
