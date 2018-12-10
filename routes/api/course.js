const express = require('express');

const validator = require('../../validation').course;

const router = express.Router();

const Day = require('../../models/Day');

router.get('/', (req, res) => Day.find().then(arr => res.json(arr)));

router.post('/', (req, res) => {
    const {errors, isValid} = validator(req.body);

    if (!isValid) {
        return res.status(400).json({errors});
    }

    const newDay = new Day({count: req.body.count, date: new Date(req.body.date).getTime()});

    newDay.save().then(day => res.json(day));
});

module.exports = router;
