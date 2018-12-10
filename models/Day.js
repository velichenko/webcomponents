const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
    count: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = Day = mongoose.model('course', DaySchema);
