const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'email field must be correct';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'email field is required';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'password field is required';
    }

    return {errors, isValid: isEmpty(errors)};
};
