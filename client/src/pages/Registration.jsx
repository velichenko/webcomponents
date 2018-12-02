import React, {Component} from 'react';
import Input from "../components/Input";

class Registration extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };

    render() {
        const {name, email, password} = this.state;
        return (
            <form onSubmit={this.submitHandler}>
                <Input
                    placeholder="Имя"
                    value={name}
                    onChange={this.changeHandler('name')}
                />

                <Input
                    placeholder="Email"
                    value={email}
                    onChange={this.changeHandler('email')}
                />

                <Input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={this.changeHandler('password')}
                />

                <button>Зарегестрироваться</button>
            </form>
        );
    }

    changeHandler = field => value => this.setState(state => ({...state, [field]: value}));

    submitHandler = e => {
        e.preventDefault();

        fetch('/api/client/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }
        )
            .then(res => res.status !== 200 ? new Error() : res)
            .then(() => console.log('success'))
            .then(() => this.setState(state => ({...state, name: '', email: '', password: ''})))
            .catch(() => console.log('failure'));
    };
}

export default Registration;
