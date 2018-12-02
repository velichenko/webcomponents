import React, {Component} from 'react';
import Input from "../../components/Input";
import validator from "./validator";

class Registration extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        errors: {}
    };

    render() {
        const {name, email, password, errors} = this.state;
        return (
            <form onSubmit={this.submitHandler}>
                <Input
                    placeholder="Имя"
                    value={name}
                    onChange={this.changeHandler('name')}
                    onBlur={this.validator('name')}
                    error={errors.name}
                />

                <Input
                    placeholder="Email"
                    value={email}
                    onChange={this.changeHandler('email')}
                    onBlur={this.validator('email')}
                    error={errors.email}
                />

                <Input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={this.changeHandler('password')}
                    onBlur={this.validator('password')}
                    error={errors.password}
                />

                <button>Зарегестрироваться</button>
            </form>
        );
    }

    validator = field => () => {
        const {errors} = validator({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        });

        this.setState(state => ({...state, errors: {...state.errors, [field]: errors[field]}}));
    };

    changeHandler = field => value => this.setState(state => ({...state, [field]: value}), () => this.validator(field)());

    submitHandler = e => {
        e.preventDefault();

        const {errors, isValid} = validator({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        });

        if (!isValid) {
            return this.setState(state => ({...state, errors}));
        }

        fetch('/api/client/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                })
            }
        )
            .then(res => res.status !== 200 ? new Error() : res)
            .then(() => console.log('success'))
            .then(() => this.setState(state => ({...state, name: '', email: '', password: ''})))
            .catch(() => console.log('failure'));
    };
}

export default Registration;
