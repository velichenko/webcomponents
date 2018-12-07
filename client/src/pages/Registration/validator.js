import validator from 'validator';

export default data => {
    let errors = {};

    if (validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'email field must be correct';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'email field is required';
    }

    if (!validator.isLength(data.password, {min: 8, max: 20})) {
        errors.password = 'password field must be from 8 to 20';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'password field is required';
    }

    return {errors, isValid: !Object.keys(errors).length};
};
