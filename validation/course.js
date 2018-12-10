const isEmpty = require('./is-empty');

module.exports = data => {
    let errors = {};

    if (data.count === null || data.count === undefined) {
        errors.count = 'count field is required';
    }

    if (data.count === null || data.count === undefined) {
        errors.date = 'date field is required';
    }

    return {errors, isValid: isEmpty(errors)};
};
