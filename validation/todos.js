const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';

    if (validator.isEmpty(data.title)) {
        errors.title = 'title field is required';
    }

    return {errors, isValid: isEmpty(errors)};
};
