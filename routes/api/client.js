const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const {service, user, pass} = require('../../config/application-dev').mail;

router.post('/request', (req, res) => {
    const {firstName, lastName, email} = req.body;

    const transporter = nodemailer.createTransport({
        service, auth: {user, pass}
    });

    const mailOptions = {
        from: user,
        to: email,
        subject: 'Письмо при помощи Node.js',
        text: `Добрый день ${firstName} ${lastName}! Ваша заявка получена.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

module.exports = router;
