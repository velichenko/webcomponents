import validator from 'validator';

export default data => {
    let errors = {};

    if (validator.isEmpty(data.title)) {
        errors.title = 'title field is required';
    }

    return {errors, isValid: !Object.keys(errors).length};
};
