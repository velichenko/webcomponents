const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/request', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpass'
        }
    });

    const mailOptions = {
        from: 'youremail@gmail.com',
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
