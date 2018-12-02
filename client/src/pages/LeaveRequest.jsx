import React, {Component} from 'react';
import Input from "../components/Input";

class LeaveRequest extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: ''
    };

    render() {
        const {firstName, lastName, email} = this.state;

        return (
            <form onSubmit={this.submitHandler}>
                <Input
                    placeholder="Имя"
                    value={firstName}
                    onChange={this.changeHandler('firstName')}
                />

                <Input
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={this.changeHandler('lastName')}
                />

                <Input
                    placeholder="Email"
                    value={email}
                    onChange={this.changeHandler('email')}
                />

                <button>Отправить</button>
            </form>
        );
    }

    changeHandler = field => value => this.setState(state => ({...state, [field]: value}));

    submitHandler = e => {
        e.preventDefault();

        fetch('/api/client/request', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }
        )
            .then(() => console.log('success'))
            .catch(() => console.log('failure'));
    };
}

export default LeaveRequest;
