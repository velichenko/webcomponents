const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const router = express.Router();
const {service, user, pass} = require('../../config/application-dev').mail;

const Client = require('../../models/Client');

router.post('/register', (req, res) => {
    Client.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(403).json({message: 'User already exist'});
        }

        const newUser = new Client({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });

    });
});

router.post('/request', (req, res) => {
    const {firstName, lastName, email} = req.body;

    const transporter = nodemailer.createTransport({
        service, auth: {user, pass}
    });

    const mailOptions = {
        from: user,
        to: email,
        subject: 'Отправка письма при помощи Node.js',
        text: `Добрый день ${firstName} ${lastName}! Ваша заявка получена.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(400).json({error})
        }

        return res.json({message: `Email sent: ${info.response}`});
    });
});

module.exports = router;
