const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const {service, user, pass} = require('../../config/application-dev').mail;

router.post('/request', (req, res) => {
    const transporter = nodemailer.createTransport({
        service, auth: {user, pass}
    });

    const mailOptions = {
        from: user,
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
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
