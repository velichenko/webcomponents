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

    Day.where({date: req.body.date}).findOne()
        .then(day => {
            if (day) {
                day.count = req.body.count;

                return day.save().then(day => res.json(day))
            }

            const newDay = new Day({count: req.body.count, date: req.body.date});

            return newDay.save().then(day => res.json(day));
        });
});

module.exports = router;
